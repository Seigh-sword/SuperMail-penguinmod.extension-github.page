export const validateProvider = (email) => {
  if (!email || !email.includes('@')) return null;
  const domain = email.split('@')[1].toLowerCase();
  
  if (domain.includes('gmail')) return 'gmail';
  if (domain.includes('outlook') || domain.includes('hotmail') || domain.includes('live')) return 'outlook';
  if (domain.includes('yahoo')) return 'yahoo';
  if (domain.includes('icloud')) return 'icloud';
  
  return null;
};

export const checkFields = (data) => {
  const { user_email, auth_data, to, subject, message } = data;
  return !!(user_email && auth_data && to && subject && message);
};