const signupOtpTemplate = (name, otp) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Welcome to Student Growth Hub</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f6f8;
              margin: 0;
              padding: 0;
            }
            .container {
              background-color: #ffffff;
              margin: 40px auto;
              padding: 30px;
              border-radius: 8px;
              max-width: 600px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }
            .header {
              text-align: center;
              padding-bottom: 20px;
            }
            .header h1 {
              color: #1e88e5;
            }
            .content {
              font-size: 16px;
              line-height: 1.6;
              color: #444444;
            }
            .otp-box {
              background-color: #f0f4ff;
              border-left: 5px solid #1e88e5;
              padding: 15px;
              margin: 20px 0;
              font-size: 24px;
              font-weight: bold;
              letter-spacing: 4px;
              text-align: center;
              color: #1e88e5;
            }
            .footer {
              font-size: 14px;
              color: #888888;
              text-align: center;
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Student Growth Hub!</h1>
            </div>
            <div class="content">
              <p>Hi <strong>${name}</strong>,</p>
              <p>We're thrilled to have you on board! 🎉</p>
              <p>To complete your signup, please verify your email address by entering the following OTP:</p>
              
              <div class="otp-box">${otp}</div>
    
              <p>This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
              <p>If you did not sign up for Student Growth Hub, please ignore this email.</p>
              
              <p>Best regards,<br><strong>Student Growth Hub Team</strong></p>
            </div>
            <div class="footer">
              <p>&copy; 2025 Student Growth Hub. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;
}


const loginOtpTemplate = (name, otp) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Verify Your Login - Student Growth Hub</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f8;
            margin: 0;
            padding: 0;
          }
          .container {
            background-color: #ffffff;
            margin: 40px auto;
            padding: 30px;
            border-radius: 8px;
            max-width: 600px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #1e88e5;
          }
          .content {
            font-size: 16px;
            line-height: 1.6;
            color: #444444;
          }
          .otp-box {
            background-color: #f0f4ff;
            border-left: 5px solid #1e88e5;
            padding: 15px;
            margin: 20px 0;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 4px;
            text-align: center;
            color: #1e88e5;
          }
          .footer {
            font-size: 14px;
            color: #888888;
            text-align: center;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Verify Your Login</h1>
          </div>
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>We detected a login attempt to your Student Growth Hub account.</p>
            <p>Please verify your identity by entering the OTP below:</p>
  
            <div class="otp-box">${otp}</div>
  
            <p>This code will expire in 10 minutes. If you did not attempt to log in, you can safely ignore this email.</p>
            <p>Thanks for keeping your account secure.</p>
  
            <p>Best regards,<br><strong>Student Growth Hub Team</strong></p>
          </div>
          <div class="footer">
            <p>&copy; 2025 Student Growth Hub. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
};


const forgotPasswordTemplate = (name, resetUrl) => {
    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #eaeaea; border-radius: 10px;">
        <h2 style="color: #333;">Hi ${name},</h2>
        <p style="color: #555;">
          You recently requested to reset your password. Click the button below to proceed:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
        </div>
        <p style="color: #777;">
          If you didn’t request a password reset, you can safely ignore this email.
        </p>
        <p style="color: #777;">Thanks,<br>The Support Team</p>
      </div>
    `
}


module.exports = { signupOtpTemplate, loginOtpTemplate, forgotPasswordTemplate }