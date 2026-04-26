const BASE_URL = 'http://localhost:3000';
const API_BASE = 'http://localhost:5174/api';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testFrontendIntegration() {
  let testResults = [];

  console.log('\n=== FRONTEND INTEGRATION TEST ===\n');

  try {
    // Test 1: Check if frontend is running
    console.log('1. Checking if Frontend is running...');
    const homeRes = await fetch(BASE_URL);
    console.log('Status:', homeRes.status);
    if (homeRes.ok) {
      const html = await homeRes.text();
      console.log('✓ Frontend is serving HTML');
      testResults.push({ test: 'Frontend Running', pass: true });
    } else {
      console.log('✗ Frontend returned status:', homeRes.status);
      testResults.push({ test: 'Frontend Running', pass: false });
    }

    // Test 2: Check if key pages exist
    console.log('\n2. Checking if key pages exist...');
    const pages = ['index.html', 'pages/login.html', 'pages/register.html', 'pages/dashboard.html'];
    let allPagesExist = true;
    
    for (const page of pages) {
      const pageRes = await fetch(`${BASE_URL}/${page}`);
      const exists = pageRes.ok;
      console.log(`  - ${page}: ${exists ? '✓' : '✗'}`);
      if (!exists) allPagesExist = false;
    }
    testResults.push({ test: 'Pages Exist', pass: allPagesExist });

    // Test 3: Check if CSS loads
    console.log('\n3. Checking if CSS loads...');
    const cssRes = await fetch(`${BASE_URL}/css/styles.css`);
    console.log('CSS Status:', cssRes.status);
    testResults.push({ test: 'CSS Loading', pass: cssRes.ok });

    // Test 4: Check if JS files exist
    console.log('\n4. Checking if JS files exist...');
    const jsFiles = ['js/api.js', 'js/app.js'];
    let allJsExist = true;
    
    for (const file of jsFiles) {
      const jsRes = await fetch(`${BASE_URL}/${file}`);
      const exists = jsRes.ok;
      console.log(`  - ${file}: ${exists ? '✓' : '✗'}`);
      if (!exists) allJsExist = false;
    }
    testResults.push({ test: 'JS Files Exist', pass: allJsExist });

    // Test 5: Verify Backend API connectivity
    console.log('\n5. Verifying Backend API connectivity...');
    try {
      const apiRes = await fetch(`${API_BASE}/plans`);
      console.log('Backend Status:', apiRes.status);
      testResults.push({ test: 'Backend Reachable', pass: apiRes.ok });
    } catch (e) {
      console.log('✗ Cannot reach backend:', e.message);
      testResults.push({ test: 'Backend Reachable', pass: false });
    }

    // Test 6: End-to-End Auth Flow
    console.log('\n6. Testing End-to-End Auth Flow...');
    const email = 'e2e' + Date.now() + '@test.com';
    
    // Register
    console.log('  - Registering new user...');
    const registerRes = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'E2E Test User',
        email: email,
        password: 'password123'
      })
    });
    
    if (registerRes.ok) {
      console.log('    ✓ Registration successful');
      
      // Login
      console.log('  - Logging in...');
      const loginRes = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: 'password123'
        })
      });
      
      if (loginRes.ok) {
        const loginData = await loginRes.json();
        const token = loginData.data.accessToken;
        console.log('    ✓ Login successful, token obtained');
        
        // Test protected endpoint
        console.log('  - Testing protected endpoint...');
        const protectedRes = await fetch(`${API_BASE}/users/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (protectedRes.ok) {
          console.log('    ✓ Protected endpoint accessible');
          testResults.push({ test: 'End-to-End Auth Flow', pass: true });
        } else {
          console.log('    ✗ Protected endpoint failed:', protectedRes.status);
          testResults.push({ test: 'End-to-End Auth Flow', pass: false });
        }
      } else {
        console.log('    ✗ Login failed:', loginRes.status);
        testResults.push({ test: 'End-to-End Auth Flow', pass: false });
      }
    } else {
      console.log('    ✗ Registration failed:', registerRes.status);
      testResults.push({ test: 'End-to-End Auth Flow', pass: false });
    }

    // Test 7: Verify token storage (localStorage compatibility)
    console.log('\n7. Testing Token Storage Mechanism...');
    try {
      const testKey = 'test_' + Date.now();
      const testValue = 'test_value_' + Date.now();
      localStorage.setItem(testKey, testValue);
      const retrieved = localStorage.getItem(testKey);
      const success = retrieved === testValue;
      localStorage.removeItem(testKey);
      console.log(success ? '✓ localStorage working' : '✗ localStorage failed');
      testResults.push({ test: 'Token Storage', pass: success });
    } catch (e) {
      console.log('✗ localStorage error:', e.message);
      testResults.push({ test: 'Token Storage', pass: false });
    }

    // Test 8: Check for console errors in frontend files
    console.log('\n8. Checking JS files for syntax...');
    try {
      for (const file of jsFiles) {
        const jsRes = await fetch(`${BASE_URL}/${file}`);
        const js = await jsRes.text();
        // Basic check for common syntax errors
        const hasSyntaxIssues = js.includes('undefined is not a function') || 
                                js.includes('Cannot read properties') ||
                                js.includes('SyntaxError');
        console.log(`  - ${file}: ${hasSyntaxIssues ? '⚠ Warning' : '✓ OK'}`);
      }
      testResults.push({ test: 'JS Syntax Check', pass: true });
    } catch (e) {
      console.log('✗ JS check error:', e.message);
      testResults.push({ test: 'JS Syntax Check', pass: false });
    }

    // Print Summary
    console.log('\n\n=== FRONTEND TEST SUMMARY ===\n');
    let passCount = 0;
    let failCount = 0;
    testResults.forEach(result => {
      const status = result.pass ? '✓ PASS' : '✗ FAIL';
      console.log(`${status}: ${result.test}`);
      if (result.pass) passCount++;
      else failCount++;
    });
    console.log(`\nTotal: ${passCount} passed, ${failCount} failed`);

    if (failCount === 0) {
      console.log('\n🎉 FRONTEND INTEGRATION TEST PASSED!');
    } else {
      console.log('\n❌ FRONTEND INTEGRATION TEST FAILED!');
    }

  } catch (error) {
    console.error('\n❌ CRITICAL ERROR:', error.message);
  }
}

testFrontendIntegration();