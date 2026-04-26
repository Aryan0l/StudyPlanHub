async function testUserRegistrationAndLogin() {
  const API_BASE = 'http://localhost:5174/api';
  const credentials = {
    name: 'Dhiraj Kumar',
    email: 'dhirajroyjio@gmail.com',
    password: 'Dhiraj@1442'
  };

  console.log('\n' + '='.repeat(60));
  console.log('🔐 USER REGISTRATION & LOGIN TEST');
  console.log('='.repeat(60) + '\n');

  try {
    // Step 1: Registration
    console.log('📝 Step 1: REGISTRATION');
    console.log('-'.repeat(60));
    console.log(`Name:     ${credentials.name}`);
    console.log(`Email:    ${credentials.email}`);
    console.log(`Password: ${credentials.password}`);
    console.log('');

    const registerRes = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    const registerData = await registerRes.json();

    if (registerRes.status === 201) {
      console.log('✅ REGISTRATION SUCCESSFUL!');
      console.log('');
      console.log('Registered User Details:');
      console.log(JSON.stringify(registerData.data, null, 2));
      const userId = registerData.data.id;

      // Step 2: Login
      console.log('\n' + '='.repeat(60));
      console.log('🔑 Step 2: LOGIN');
      console.log('-'.repeat(60));
      console.log(`Email:    ${credentials.email}`);
      console.log(`Password: ${credentials.password}`);
      console.log('');

      const loginRes = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      const loginData = await loginRes.json();

      if (loginRes.status === 200) {
        console.log('✅ LOGIN SUCCESSFUL!');
        console.log('');
        console.log('Login Response:');
        console.log(JSON.stringify(loginData.data, null, 2));

        const accessToken = loginData.data.accessToken;
        const refreshToken = loginData.data.refreshToken;

        // Step 3: Verify Protected Route
        console.log('\n' + '='.repeat(60));
        console.log('🛡️  Step 3: VERIFY PROTECTED ROUTE');
        console.log('-'.repeat(60));
        console.log('Testing: GET /users/me with Bearer Token');
        console.log('');

        const profileRes = await fetch(`${API_BASE}/users/me`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        const profileData = await profileRes.json();

        if (profileRes.status === 200) {
          console.log('✅ PROTECTED ROUTE ACCESSIBLE!');
          console.log('');
          console.log('User Profile:');
          console.log(JSON.stringify(profileData.data, null, 2));

          // Final Summary
          console.log('\n' + '='.repeat(60));
          console.log('✅ ALL TESTS PASSED!');
          console.log('='.repeat(60));
          console.log('\n📊 Summary:');
          console.log(`  ✅ Registration:      SUCCESS (User ID: ${userId})`);
          console.log(`  ✅ Login:             SUCCESS (Tokens generated)`);
          console.log(`  ✅ Access Control:    SUCCESS (Protected route accessible)`);
          console.log('\n🎯 You can now:');
          console.log(`  1. Visit http://localhost:3000`);
          console.log(`  2. Go to Login page`);
          console.log(`  3. Enter: ${credentials.email} / ${credentials.password}`);
          console.log(`  4. Access Dashboard and Create Study Plans`);
          console.log('\n' + '='.repeat(60) + '\n');

        } else {
          console.log('❌ PROTECTED ROUTE FAILED!');
          console.log('Status:', profileRes.status);
          console.log('Response:', profileData);
        }

      } else {
        console.log('❌ LOGIN FAILED!');
        console.log('Status:', loginRes.status);
        console.log('Response:', loginData);
      }

    } else if (registerRes.status === 409) {
      console.log('⚠️  EMAIL ALREADY EXISTS!');
      console.log('');
      console.log('This email is already registered in the system.');
      console.log('Attempting to login instead...');
      console.log('');

      const loginRes = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      const loginData = await loginRes.json();

      if (loginRes.status === 200) {
        console.log('✅ LOGIN SUCCESSFUL!');
        console.log('');
        console.log('Login Response:');
        console.log(JSON.stringify(loginData.data, null, 2));

        console.log('\n' + '='.repeat(60));
        console.log('✅ TEST PASSED - USER CAN LOGIN!');
        console.log('='.repeat(60) + '\n');
      } else {
        console.log('❌ LOGIN FAILED!');
        console.log('Status:', loginRes.status);
        console.log('Response:', loginData);
      }

    } else {
      console.log('❌ REGISTRATION FAILED!');
      console.log('Status:', registerRes.status);
      console.log('Response:', registerData);
    }

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
  }
}

testUserRegistrationAndLogin();