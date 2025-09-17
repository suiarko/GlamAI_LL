'use client'

import { initializePaddle, Paddle } from '@paddle/paddle-js';

// Singleton pattern to ensure Paddle is initialized only once
let paddleInstance: Paddle | null = null;

const getPaddle = async (): Promise<Paddle | null> => {
  if (process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID) {
    if (!paddleInstance) {
      paddleInstance = await initializePaddle({
        vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
        environment: process.env.NEXT_PUBLIC_PADDLE_SANDBOX === 'true' 
          ? 'sandbox' 
          : 'production',
      });
    }
    return paddleInstance;
  }
  console.error("Paddle Vendor ID is not configured.");
  return null;
};

export const openCheckout = async (priceId: string, userEmail?: string) => {
  const paddle = await getPaddle();
  if (paddle) {
    paddle.Checkout.open({
      items: [{
        priceId: priceId,
        quantity: 1,
      }],
      customer: userEmail ? { email: userEmail } : undefined,
    });
  } else {
    alert("Payment system is currently unavailable. Please try again later.");
  }
};
