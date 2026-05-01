// ========================================
// API 請求函式
// ========================================

const axios = require("axios");
const { API_PATH, BASE_URL, ADMIN_TOKEN } = require("./config");
const customerApiUrl = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}`;
const adminApiUrl = `${BASE_URL}/api/livejs/v1/admin/${API_PATH}`;

// ========== 客戶端 API ==========

/**
 * 取得產品列表
 * @returns {Promise<Array>}
 */
async function fetchProducts() {
  try {
    const res = await axios.get(`${customerApiUrl}/products`);
    return res.data.products;
  } catch (error) {
    return error.message;
  }
}

/**
 * 取得購物車
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function fetchCart() {
  // 請實作此函式
  try {
    const res = await axios.get(`${customerApiUrl}/carts`);
    const { carts, total, finalTotal } = res.data;
    return { carts, total, finalTotal };
  } catch (error) {
    return error.message;
  }
}

/**
 * 加入購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function addToCart(productId, quantity) {
  try {
    const data = {
      data: {
        productId,
        quantity,
      },
    };
    const res = await axios.post(`${customerApiUrl}/carts`, data);
    return res.data;
  } catch (error) {
    return error.message;
  }
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function updateCartItem(cartId, quantity) {
  try {
    const data = {
      data: {
        cartId,
        quantity,
      },
    };
    const res = await axios.patch(`${customerApiUrl}/carts`, data);
    return res.data;
  } catch (error) {
    return error.message;
  }
}

/**
 * 刪除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function deleteCartItem(cartId) {
  try {
    const res = await axios.delete(`${customerApiUrl}/carts/${cartId}`);
    return res.data;
  } catch (error) {
    return error.message;
  }
}

/**
 * 清空購物車
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function clearCart() {
  try {
    const res = await axios.delete(`${customerApiUrl}/carts`);
    return res.data;
  } catch (error) {
    return error.message;
  }
}

/**
 * 建立訂單
 * @param {Object} userInfo - 使用者資料
 * @returns {Promise<Object>}
 */
async function createOrder(userInfo) {
  try {
    const userInfo = {
      data: {
        user: {
          name: "六角學院",
          tel: "07-5313506",
          email: "hexschool@hexschool.com",
          address: "高雄市六角學院路",
          payment: "Apple Pay",
        },
      },
    };
    const res = await axios.post(`${customerApiUrl}/orders`, userInfo);
    return res.data;
  } catch (error) {
    return error.message;
  }
}

// ========== 管理員 API ==========

/**
 * 管理員 API 需加上認證
 * 提示：
    headers: {
      authorization: ADMIN_TOKEN
    }
 */

/**
 * 取得訂單列表
 * @returns {Promise<Array>}
 */
async function fetchOrders() {
  try {
    const res = await axios.get(`${adminApiUrl}/orders`, {
      headers: {
        authorization: ADMIN_TOKEN,
      },
    });
    return res.data.orders;
  } catch (error) {
    return error.message;
  }
}

/**
 * 更新訂單狀態
 * @param {string} orderId - 訂單 ID
 * @param {boolean} isPaid - 是否已付款
 * @returns {Promise<Object>}
 */
async function updateOrderStatus(orderId, isPaid) {
  try {
    const data = {
      data: {
        id: orderId,
        paid: isPaid,
      },
    };
    const res = await axios.put(`${adminApiUrl}/orders`, data, {
      headers: {
        authorization: ADMIN_TOKEN,
      },
    });
    return res.data;
  } catch (error) {
    return error.message;
  }
}

/**
 * 刪除訂單
 * @param {string} orderId - 訂單 ID
 * @returns {Promise<Object>}
 */
async function deleteOrder(orderId) {
  try {
    const res = await axios.delete(`${adminApiUrl}/orders/${orderId}`, {
      headers: {
        authorization: ADMIN_TOKEN,
      },
    });
    return res.data;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  fetchProducts,
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  createOrder,
  fetchOrders,
  updateOrderStatus,
  deleteOrder,
};
