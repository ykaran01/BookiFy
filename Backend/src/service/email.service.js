import { transporter } from "../config/email.config.js";
export const sendMail = async({OrderStatus , email})=>{
    try {
      
  const info = await transporter.sendMail({
    from: process.env.ADMIN_EMAIL ,
    to: email, 
    subject: "  Message  Reagarding To Your Order",  
    html: MesssageObject[OrderStatus], 
  });
  
} catch (err) {
  throw new Error("Failed to send email notification");
}
}
const MesssageObject = {
    pending:" <b> Your order is pending. We will notify you once it is confirmed.</b>",
    confirmed:" <b>Great news! Your order has been confirmed and is being processed.</b>",
    delivered:" <b>Your order has been delivered. We hope you enjoy your purchase!</b>",
    cancelled:" <b>We regret to inform you that your order has been cancelled. If you have any questions, please contact our support team.</b>"
}