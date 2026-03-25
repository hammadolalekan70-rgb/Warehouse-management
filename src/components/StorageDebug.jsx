// src/components/StorageDebug.jsx
import React, { useState } from 'react';

// This needs access to memoryStorage from OrderContext
// For debugging purposes, we'll create a local reference
let memoryStorageRef = { orders: [], payments: [] };

// This will be updated by OrderContext
export const updateMemoryStorage = (storage) => {
  memoryStorageRef = storage;
};

function StorageDebug() {
  const [testResult, setTestResult] = useState('');

  const testLocalStorage = () => {
    try {
      localStorage.setItem('__debug_test__', 'working');
      const value = localStorage.getItem('__debug_test__');
      localStorage.removeItem('__debug_test__');
      
      if (value === 'working') {
        setTestResult('✅ localStorage is working!');
      } else {
        setTestResult('❌ localStorage returned wrong value');
      }
    } catch (e) {
      setTestResult(`❌ localStorage error: ${e.message}`);
    }
  };

  const checkOrders = () => {
    try {
      const orders = localStorage.getItem('orders');
      setTestResult(`Orders in localStorage: ${orders || 'none'}`);
      console.log('Raw orders:', orders);
    } catch (e) {
      setTestResult(`Error reading orders: ${e.message}`);
    }
  };

  const checkMemoryStorage = () => {
    console.log('Memory storage contents:', memoryStorageRef);
    setTestResult(`Memory storage has ${memoryStorageRef.orders?.length || 0} orders. Check console.`);
  };

  const forceSaveTestOrder = () => {
    const testOrder = {
      id: Date.now(),
      customerName: "Debug Test",
      customerEmail: "debug@test.com",
      total: 5000,
      status: "Pending",
      date: new Date().toLocaleDateString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('orders') || '[]');
      existing.push(testOrder);
      localStorage.setItem('orders', JSON.stringify(existing));
      setTestResult('✅ Test order saved! Check localStorage');
    } catch (e) {
      setTestResult(`❌ Failed to save: ${e.message}`);
    }
  };

  const clearAllData = () => {
    if (window.confirm('Clear all orders from localStorage?')) {
      localStorage.removeItem('orders');
      localStorage.removeItem('payments');
      setTestResult('✅ All data cleared from localStorage');
    }
  };

  return (
    <div style={{
      padding: '20px',
      margin: '20px 0',
      border: '2px solid #ff6b6b',
      borderRadius: '10px',
      background: '#fff5f5'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#c53030' }}>🔧 STORAGE DEBUG TOOLS</h3>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
        <button onClick={testLocalStorage} style={buttonStyle}>
          Test localStorage
        </button>
        <button onClick={checkOrders} style={buttonStyle}>
          Check Orders
        </button>
        <button onClick={checkMemoryStorage} style={buttonStyle}>
          Check Memory
        </button>
        <button onClick={forceSaveTestOrder} style={buttonStyle}>
          Save Test Order
        </button>
        <button onClick={clearAllData} style={{...buttonStyle, background: '#dc3545'}}>
          Clear All Data
        </button>
      </div>
      
      {testResult && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          background: '#fff',
          borderRadius: '5px',
          fontFamily: 'monospace',
          border: '1px solid #ddd'
        }}>
          <strong>Result:</strong> {testResult}
        </div>
      )}

      <div style={{
        marginTop: '15px',
        padding: '10px',
        background: '#e2e8f0',
        borderRadius: '5px',
        fontSize: '0.9rem'
      }}>
        <strong>ℹ️ Instructions:</strong> Use these buttons to test if localStorage is working.
        If "Test localStorage" fails, your browser is blocking storage.
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '8px 16px',
  background: '#4a5568',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  transition: 'opacity 0.2s'
};

export default StorageDebug;