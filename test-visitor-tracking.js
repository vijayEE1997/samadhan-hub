#!/usr/bin/env node

/**
 * Test script for visitor tracking API
 * Run this to verify the API is working correctly
 */

const fetch = require('node-fetch');

const BASE_URL = process.env.TEST_URL || 'http://localhost:5000';

async function testVisitorTracking() {
  console.log('🧪 Testing Visitor Tracking API');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log('=' .repeat(50));

  try {
    // Test 1: System Status
    console.log('\n1️⃣ Testing System Status...');
    const statusResponse = await fetch(`${BASE_URL}/api/visitors/status`);
    const statusData = await statusResponse.json();
    
    if (statusResponse.ok) {
      console.log('✅ System Status:', statusData.data);
    } else {
      console.log('❌ System Status Failed:', statusData);
    }

    // Test 2: Track Visit
    console.log('\n2️⃣ Testing Visit Tracking...');
    const trackResponse = await fetch(`${BASE_URL}/api/visitors/track`);
    const trackData = await trackResponse.json();
    
    if (trackResponse.ok) {
      console.log('✅ Visit Tracked:', trackData.data);
    } else {
      console.log('❌ Visit Tracking Failed:', trackData);
    }

    // Test 3: Get Visitor Count
    console.log('\n3️⃣ Testing Visitor Count...');
    const countResponse = await fetch(`${BASE_URL}/api/visitors/count`);
    const countData = await countResponse.json();
    
    if (countResponse.ok) {
      console.log('✅ Visitor Count:', countData.data);
    } else {
      console.log('❌ Visitor Count Failed:', countData);
    }

    // Test 4: Get Detailed Stats
    console.log('\n4️⃣ Testing Detailed Stats...');
    const statsResponse = await fetch(`${BASE_URL}/api/visitors/stats`);
    const statsData = await statsResponse.json();
    
    if (statsResponse.ok) {
      console.log('✅ Detailed Stats:', statsData.data);
    } else {
      console.log('❌ Detailed Stats Failed:', statsData);
    }

    // Test 5: Get Visitor List
    console.log('\n5️⃣ Testing Visitor List...');
    const listResponse = await fetch(`${BASE_URL}/api/visitors/list?limit=5`);
    const listData = await listResponse.json();
    
    if (listResponse.ok) {
      console.log('✅ Visitor List:', listData.data);
    } else {
      console.log('❌ Visitor List Failed:', listData);
    }

    // Test 6: Get Data File Info
    console.log('\n6️⃣ Testing Data File Info...');
    const fileResponse = await fetch(`${BASE_URL}/api/visitors/data-file`);
    const fileData = await fileResponse.json();
    
    if (fileResponse.ok) {
      console.log('✅ Data File Info:', fileData.data);
    } else {
      console.log('❌ Data File Info Failed:', fileData);
    }

    console.log('\n' + '=' .repeat(50));
    console.log('🎯 Test Summary:');
    console.log(`✅ System Status: ${statusResponse.ok ? 'PASS' : 'FAIL'}`);
    console.log(`✅ Visit Tracking: ${trackResponse.ok ? 'PASS' : 'FAIL'}`);
    console.log(`✅ Visitor Count: ${countResponse.ok ? 'PASS' : 'FAIL'}`);
    console.log(`✅ Detailed Stats: ${statsResponse.ok ? 'PASS' : 'FAIL'}`);
    console.log(`✅ Visitor List: ${listResponse.ok ? 'PASS' : 'FAIL'}`);
    console.log(`✅ Data File Info: ${fileResponse.ok ? 'PASS' : 'FAIL'}`);

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
if (require.main === module) {
  testVisitorTracking();
}

module.exports = { testVisitorTracking };
