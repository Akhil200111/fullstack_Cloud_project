import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from the React app
}));

app.post("/api/payment", (req, res) => {
  try {
    const { cardName,cardNumber, expiry, cvc, payment } = req.body;
    console.log("Payment received:", { cardName,cardNumber, expiry, cvc, payment });
    res.json({ 
        message: "Payment received successfully",
        success: true,
    });
  } catch (error) {
    console.error("Error occurred while processing payment", error);
    res.status(500).json({ 
        message: "Error occurred while processing payment",
        success: false,
    });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});