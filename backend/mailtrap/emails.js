import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from './emailTemplates.js'
import { mailtrapClient,sender } from "./mailtrap.config.js"


export const sendVerificationEmail = async (email,varificationToken)=>{
  const recipient = [{email}]

  try {
    const response = await mailtrapClient.send({
      from:sender,
      to:recipient,
      subject:"Verify your email",
      html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",varificationToken),
      category:"Email Verification",
    });

    console.log("Email sent successfully",response)
  } catch (error) {
    console.log('Error sending verification',error)
    throw new Error(`Error sending verification email: ${error}`)
  }
};

export const sendWelcomeEmail = async (email, name)=>{
  const recipient = [{email}];

  try {
    const response = await mailtrapClient.send({
      from:sender,
      to:recipient,
      template_uuid:"b5955cab-94e9-4d00-a420-ce946c66cb84",
      template_variables:{
         "company_info_name": "Auth Company",
      "name": name
      }
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.log(`Eroor sending welcome email: ${error}`)
  }
}

export const sendPasswordResetEmail = async (email,resetURL) =>{
  const recipient = [{email}];

  try {
    const response = await mailtrapClient.send({
      from:sender,
      to:recipient,
      subject:"Reset your password",
      html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
      category:"Password Reset"
    })
  } catch (error) {
    console.log(`Error sending password reset email `,error)
    throw new Error(`Error sending password reset email: ${error}`)
  }
}

export const sendResetSuccessEmail = async (email)=>{
  const recipient = [{email}];

  try {
    const response = await mailtrapClient.send({
      from:sender,
      to:recipient,
      subject:"Password reset successful",
      html:PASSWORD_RESET_SUCCESS_TEMPLATE,
      category:"Password Reset"
    })

    console.log("password reset email sent successfully ",response)
  } catch (error) {
    console.error('Error sending password reset Success email',error)
    throw new Error(`Error sending password reset success email ${error}`)
  }
}