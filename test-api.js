async function testAPI() {
  const baseURL = 'http://localhost:5174/api';
  const email = 'test' + Date.now() + '@example.com';

  try {
    // Register
    console.log('Testing Register...');
    const registerRes = await fetch(`${baseURL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: email,
        password: 'password123'
      })
    });
    console.log('Register status:', registerRes.status);
    const registerData = await registerRes.json();
    console.log('Register response:', registerData);

    // Login
    console.log('Testing Login...');
    const loginRes = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: 'password123'
      })
    });
    console.log('Login status:', loginRes.status);
    const loginData = await loginRes.json();
    console.log('Login response:', loginData);

    if (loginData.accessToken) {
      const token = loginData.accessToken;

      // Get user profile
      console.log('Testing Get User Profile...');
      const profileRes = await fetch(`${baseURL}/users/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('Profile status:', profileRes.status);
      const profileData = await profileRes.json();
      console.log('Profile response:', profileData);

      // Create plan
      console.log('Testing Create Plan...');
      const createPlanRes = await fetch(`${baseURL}/plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: 'Test Plan',
          description: 'A test study plan',
          category: 'Math',
          durationDays: 7,
          tasks: [{ day: 1, title: 'Task 1', description: 'Do something' }]
        })
      });
      console.log('Create Plan status:', createPlanRes.status);
      const createPlanData = await createPlanRes.json();
      console.log('Create Plan response:', createPlanData);

      if (createPlanData.id) {
        const planId = createPlanData.id;

        // Get plans
        console.log('Testing Get Plans...');
        const getPlansRes = await fetch(`${baseURL}/plans`);
        console.log('Get Plans status:', getPlansRes.status);
        const getPlansData = await getPlansRes.json();
        console.log('Get Plans response:', getPlansData);

        // Get single plan
        console.log('Testing Get Single Plan...');
        const getPlanRes = await fetch(`${baseURL}/plans/${planId}`);
        console.log('Get Plan status:', getPlanRes.status);
        const getPlanData = await getPlanRes.json();
        console.log('Get Plan response:', getPlanData);

        // Follow plan
        console.log('Testing Follow Plan...');
        const followRes = await fetch(`${baseURL}/plans/${planId}/follow`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('Follow status:', followRes.status);
        const followData = await followRes.json();
        console.log('Follow response:', followData);

        // Update progress
        console.log('Testing Update Progress...');
        const progressRes = await fetch(`${baseURL}/plans/${planId}/progress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ taskId: 1, completed: true })
        });
        console.log('Progress status:', progressRes.status);
        const progressData = await progressRes.json();
        console.log('Progress response:', progressData);

        // Rate plan
        console.log('Testing Rate Plan...');
        const rateRes = await fetch(`${baseURL}/plans/${planId}/rating`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ rating: 5 })
        });
        console.log('Rate status:', rateRes.status);
        const rateData = await rateRes.json();
        console.log('Rate response:', rateData);

        // Update plan
        console.log('Testing Update Plan...');
        const updateRes = await fetch(`${baseURL}/plans/${planId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ title: 'Updated Test Plan' })
        });
        console.log('Update status:', updateRes.status);
        const updateData = await updateRes.json();
        console.log('Update response:', updateData);

        // Delete plan
        console.log('Testing Delete Plan...');
        const deleteRes = await fetch(`${baseURL}/plans/${planId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('Delete status:', deleteRes.status);
        const deleteData = await deleteRes.json();
        console.log('Delete response:', deleteData);
      }
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();