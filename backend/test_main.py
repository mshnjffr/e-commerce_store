"""Tests for the laptop store API."""

import pytest
import time
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

# Test data - use unique username with timestamp to avoid conflicts
timestamp = str(int(time.time()))
test_user_data = {
    "username": f"test_user_{timestamp}", 
    "email": f"testuser_{timestamp}@example.com",
    "password": "testpass123"
}

login_data = {
    "username": "john_doe",
    "password": "password123"
}

# Global token storage for tests
auth_token = None


class TestHealth:
    """Test health check endpoint."""
    
    def test_root_endpoint(self):
        """Test root health check."""
        response = client.get("/")
        assert response.status_code == 200
        assert response.json() == {"message": "Laptop Store API is running"}


class TestLaptops:
    """Test laptop endpoints."""
    
    def test_get_all_laptops(self):
        """Test getting all laptops."""
        response = client.get("/api/v1/laptops")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 10  # We inserted 10 sample laptops
        
        # Check first laptop structure
        laptop = data[0]
        required_fields = ["id", "brand", "model", "processor", "ram_gb", 
                          "storage_gb", "graphics", "screen_size", "price", 
                          "stock_quantity", "created_at"]
        for field in required_fields:
            assert field in laptop
    
    def test_get_laptop_by_id(self):
        """Test getting laptop by ID."""
        response = client.get("/api/v1/laptops/1")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == 1
        assert "brand" in data
        assert "model" in data
    
    def test_get_laptop_not_found(self):
        """Test getting non-existent laptop."""
        response = client.get("/api/v1/laptops/999")
        assert response.status_code == 404
        assert response.json()["detail"] == "Laptop not found"


class TestMice:
    """Test mice endpoints."""
    
    def test_get_all_mice(self):
        """Test getting all mice."""
        response = client.get("/api/v1/mice")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 12  # We inserted 12 sample mice
        
        # Check first mouse structure
        mouse = data[0]
        required_fields = ["id", "brand", "model", "mouse_type", "connectivity", 
                          "dpi", "buttons", "rgb_lighting", "weight_grams", 
                          "price", "stock_quantity", "created_at"]
        for field in required_fields:
            assert field in mouse
    
    def test_get_mouse_by_id(self):
        """Test getting mouse by ID."""
        response = client.get("/api/v1/mice/1")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == 1
        assert "brand" in data
        assert "model" in data
    
    def test_get_mouse_not_found(self):
        """Test getting non-existent mouse."""
        response = client.get("/api/v1/mice/999")
        assert response.status_code == 404
        assert response.json()["detail"] == "Mouse not found"


class TestUsers:
    """Test user endpoints."""
    
    def test_register_user(self):
        """Test user registration."""
        response = client.post("/api/v1/users/register", json=test_user_data)
        assert response.status_code == 201
        data = response.json()
        assert data["username"] == test_user_data["username"]
        assert data["email"] == test_user_data["email"]
        assert "id" in data
        assert "created_at" in data
        assert "password" not in data  # Password should not be returned
    
    def test_register_duplicate_user(self):
        """Test registering duplicate user."""
        # Try to register the same user again
        response = client.post("/api/v1/users/register", json=test_user_data)
        assert response.status_code == 400
        assert "already registered" in response.json()["detail"]
    
    def test_login_user(self):
        """Test user login."""
        global auth_token
        # Login with the user we just registered
        test_login_data = {
            "username": test_user_data["username"],
            "password": test_user_data["password"]
        }
        response = client.post("/api/v1/users/login", json=test_login_data)
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        auth_token = data["access_token"]  # Store for later tests
    
    def test_login_invalid_credentials(self):
        """Test login with invalid credentials."""
        invalid_data = {"username": "invalid", "password": "wrong"}
        response = client.post("/api/v1/users/login", json=invalid_data)
        assert response.status_code == 401
        assert "Incorrect username or password" in response.json()["detail"]


class TestOrders:
    """Test order endpoints."""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup for order tests."""
        global auth_token
        if not auth_token:
            # Login to get token - use the registered test user
            test_login_data = {
                "username": test_user_data["username"],
                "password": test_user_data["password"]
            }
            response = client.post("/api/v1/users/login", json=test_login_data)
            auth_token = response.json()["access_token"]
    
    def test_create_order(self):
        """Test creating an order."""
        global auth_token
        headers = {"Authorization": f"Bearer {auth_token}"}
        order_data = {
            "items": [
                {"laptop_id": 1, "mice_id": None, "quantity": 1, "unit_price": 2999.99},
                {"laptop_id": 2, "mice_id": None, "quantity": 2, "unit_price": 1299.99}
            ]
        }
        
        response = client.post("/api/v1/orders", json=order_data, headers=headers)
        assert response.status_code == 201
        data = response.json()
        assert "id" in data
        assert "total_amount" in data
        assert len(data["items"]) == 2
        assert data["status"] == "pending"
    
    def test_create_mixed_order(self):
        """Test creating an order with both laptops and mice."""
        global auth_token
        headers = {"Authorization": f"Bearer {auth_token}"}
        mixed_order_data = {
            "items": [
                {"laptop_id": 1, "mice_id": None, "quantity": 1, "unit_price": 2999.99},
                {"laptop_id": None, "mice_id": 1, "quantity": 2, "unit_price": 99.99}
            ]
        }
        
        response = client.post("/api/v1/orders", json=mixed_order_data, headers=headers)
        assert response.status_code == 201
        data = response.json()
        assert "id" in data
        assert "total_amount" in data
        assert len(data["items"]) == 2
        assert data["status"] == "pending"
        
        # Verify the items are correctly stored
        items = data["items"]
        laptop_item = next(item for item in items if item["laptop_id"] is not None)
        mouse_item = next(item for item in items if item["mice_id"] is not None)
        
        assert laptop_item["laptop_id"] == 1
        assert laptop_item["mice_id"] is None
        assert mouse_item["laptop_id"] is None
        assert mouse_item["mice_id"] == 1
    
    def test_get_user_orders(self):
        """Test getting user orders."""
        global auth_token
        headers = {"Authorization": f"Bearer {auth_token}"}
        
        response = client.get("/api/v1/orders", headers=headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 1  # At least one order from previous test
    
    def test_get_order_by_id(self):
        """Test getting order by ID."""
        global auth_token
        headers = {"Authorization": f"Bearer {auth_token}"}
        
        # First get all orders to get an ID
        response = client.get("/api/v1/orders", headers=headers)
        orders = response.json()
        order_id = orders[0]["id"]
        
        # Now get specific order
        response = client.get(f"/api/v1/orders/{order_id}", headers=headers)
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == order_id
        assert "items" in data
    
    def test_update_order(self):
        """Test updating an order."""
        global auth_token
        headers = {"Authorization": f"Bearer {auth_token}"}
        
        # Get existing order
        response = client.get("/api/v1/orders", headers=headers)
        orders = response.json()
        order_id = orders[0]["id"]
        
        # Update order
        update_data = {
            "items": [
                {"laptop_id": 3, "mice_id": None, "quantity": 1, "unit_price": 2499.99}
            ]
        }
        
        response = client.put(f"/api/v1/orders/{order_id}", json=update_data, headers=headers)
        assert response.status_code == 200
        data = response.json()
        assert len(data["items"]) == 1
        assert data["items"][0]["laptop_id"] == 3
    
    def test_delete_order(self):
        """Test deleting an order."""
        global auth_token
        headers = {"Authorization": f"Bearer {auth_token}"}
        
        # Create a new order to delete
        order_data = {
            "items": [
                {"laptop_id": 4, "mice_id": None, "quantity": 1, "unit_price": 2199.99}
            ]
        }
        response = client.post("/api/v1/orders", json=order_data, headers=headers)
        order_id = response.json()["id"]
        
        # Delete the order
        response = client.delete(f"/api/v1/orders/{order_id}", headers=headers)
        assert response.status_code == 200
        assert "deleted successfully" in response.json()["message"]
        
        # Verify order is deleted
        response = client.get(f"/api/v1/orders/{order_id}", headers=headers)
        assert response.status_code == 404
    
    def test_unauthorized_order_access(self):
        """Test accessing orders without authentication."""
        response = client.get("/api/v1/orders")
        assert response.status_code == 403  # No Authorization header
        
        response = client.post("/api/v1/orders", json={"items": []})
        assert response.status_code == 403  # No Authorization header
    
    def test_create_order_insufficient_stock(self):
        """Test creating order with insufficient stock."""
        global auth_token
        headers = {"Authorization": f"Bearer {auth_token}"}
        order_data = {
            "items": [
                {"laptop_id": 1, "mice_id": None, "quantity": 1000, "unit_price": 2999.99}  # More than available stock
            ]
        }
        
        response = client.post("/api/v1/orders", json=order_data, headers=headers)
        assert response.status_code == 422  # Validation error for quantity > 100
        # Update to test with valid quantity but insufficient stock
        order_data["items"][0]["quantity"] = 50  # Valid but more than stock
        order_data["items"][0]["unit_price"] = 2999.99
        response = client.post("/api/v1/orders", json=order_data, headers=headers)
        assert response.status_code == 400
        assert "Insufficient stock" in response.json()["detail"]
    
    def test_create_order_invalid_laptop(self):
        """Test creating order with invalid laptop ID."""
        global auth_token
        headers = {"Authorization": f"Bearer {auth_token}"}
        order_data = {
            "items": [
                {"laptop_id": 999, "mice_id": None, "quantity": 1, "unit_price": 1999.99}  # Non-existent laptop
            ]
        }
        
        response = client.post("/api/v1/orders", json=order_data, headers=headers)
        assert response.status_code == 404
        assert "not found" in response.json()["detail"]


class TestValidation:
    """Test input validation."""
    
    def test_invalid_user_registration(self):
        """Test user registration with invalid data."""
        # Missing required fields
        response = client.post("/api/v1/users/register", json={})
        assert response.status_code == 422
        
        # Invalid email
        invalid_data = {
            "username": "test",
            "email": "invalid-email",
            "password": "password"
        }
        response = client.post("/api/v1/users/register", json=invalid_data)
        assert response.status_code == 422
        
        # Short password
        invalid_data = {
            "username": "test2",
            "email": "test2@example.com",
            "password": "123"  # Too short
        }
        response = client.post("/api/v1/users/register", json=invalid_data)
        assert response.status_code == 422
    
    def test_invalid_order_creation(self):
        """Test order creation with invalid data."""
        global auth_token
        headers = {"Authorization": f"Bearer {auth_token}"}
        
        # Empty items list
        response = client.post("/api/v1/orders", json={"items": []}, headers=headers)
        assert response.status_code == 422
        
        # Invalid quantity
        invalid_data = {
            "items": [
                {"laptop_id": 1, "mice_id": None, "quantity": 0, "unit_price": 2999.99}  # Invalid quantity
            ]
        }
        response = client.post("/api/v1/orders", json=invalid_data, headers=headers)
        assert response.status_code == 422
