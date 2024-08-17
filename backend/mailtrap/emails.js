import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplates.js'
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