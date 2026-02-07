const ENDPOINT = 'https://supermailbackend.vercel.app/api/send';

export const sendMail = async (userEmail, authData, recipient, subject, content) => {
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_email: userEmail,
        auth_data: authData,
        to: recipient,
        subject: subject,
        message: content
      })
    });

    return await response.json();
  } catch (error) {
    return { success: false, error: error.message };
  }
};