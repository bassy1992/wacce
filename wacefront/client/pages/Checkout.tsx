import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CreditCard, 
  Smartphone, 
  CheckCircle, 
  ArrowLeft,
  Shield,
  Clock,
  BookOpen,
  Award,
  ShoppingCart,
  User,
  Phone,
  Mail,
  MapPin,
  Lock,
  Info
} from "lucide-react";

export default function Checkout() {
  const { programmeId } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    school: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    momoNumber: "",
    momoNetwork: "MTN"
  });

  // Programme data - would come from API in real app
  const programmes = {
    "general-science": {
      title: "General Science",
      price: 500,
      originalPrice: 600,
      discount: 100,
      subjects: ["Biology", "Physics", "Chemistry", "Elective Mathematics", "ICT"],
      icon: "🧪",
      totalLessons: 120,
      duration: "12 months"
    },
    "general-arts": {
      title: "General Arts",
      price: 500,
      originalPrice: 600,
      discount: 100,
      subjects: ["Literature in English", "History", "Economics", "French", "Elective ICT"],
      icon: "📚",
      totalLessons: 110,
      duration: "12 months"
    },
    "business": {
      title: "Business",
      price: 500,
      originalPrice: 600,
      discount: 100,
      subjects: ["Financial Accounting", "Business Management", "Economics", "Cost Accounting", "ICT"],
      icon: "💼",
      totalLessons: 115,
      duration: "12 months"
    }
  };

  const programme = programmes[programmeId as keyof typeof programmes];
  const subtotal = programme?.price || 0;
  const tax = 0; // No tax for educational services in Ghana
  const total = subtotal + tax;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckout = async () => {
    if (!acceptTerms) {
      alert("Please accept the terms and conditions to continue.");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to confirmation page with order data
      navigate(`/confirmation/${programmeId}`, { 
        state: { 
          orderData: {
            programme,
            paymentMethod,
            customerInfo: formData,
            amount: total,
            orderId: `ORD-${Date.now()}`,
            paymentDate: new Date().toISOString()
          }
        }
      });
    }, 3000);
  };

  if (!programme) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Programme Not Found</h1>
            <Link to="/">
              <Button>Back to Programmes</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <Link to={`/payment/${programmeId}`} className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Payment
        </Link>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600">Complete your purchase to start learning today</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{programme.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{programme.title}</h3>
                      <p className="text-sm text-gray-600">Complete SHS Programme</p>
                      <div className="flex items-center gap-2 mt-2">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">{programme.totalLessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-600">{programme.duration} access</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>GHS {programme.originalPrice}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Early Bird Discount</span>
                      <span>-GHS {programme.discount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>GHS {tax}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>GHS {total}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-800 text-sm font-medium mb-1">
                      <Info className="h-4 w-4" />
                      What's Included
                    </div>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• HD Video Lessons</li>
                      <li>• PDF Study Materials</li>
                      <li>• Practice Tests</li>
                      <li>• Expert Support</li>
                      <li>• Mobile App Access</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName" 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="John" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Doe" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john.doe@example.com" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="0XX XXX XXXX" 
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="school">School/Institution</Label>
                    <Input 
                      id="school" 
                      value={formData.school}
                      onChange={(e) => handleInputChange("school", e.target.value)}
                      placeholder="Your school name (optional)" 
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-green-600" />
                    Payment Method
                  </CardTitle>
                  <CardDescription>
                    Your payment information is encrypted and secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">Choose Payment Method</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-3">
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium">Credit/Debit Card</div>
                            <div className="text-sm text-gray-600">Visa, Mastercard, Verve</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value="momo" id="momo" />
                        <Label htmlFor="momo" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Smartphone className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="font-medium">Mobile Money</div>
                            <div className="text-sm text-gray-600">MTN, AirtelTigo, Vodafone</div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input 
                          id="cardNumber" 
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                          placeholder="1234 5678 9012 3456" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date *</Label>
                          <Input 
                            id="expiry" 
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                            placeholder="MM/YY" 
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input 
                            id="cvv" 
                            value={formData.cvv}
                            onChange={(e) => handleInputChange("cvv", e.target.value)}
                            placeholder="123" 
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Cardholder Name *</Label>
                        <Input 
                          id="cardName" 
                          value={formData.cardholderName}
                          onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                          placeholder="John Doe" 
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "momo" && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="momoNumber">Mobile Money Number *</Label>
                        <Input 
                          id="momoNumber" 
                          value={formData.momoNumber}
                          onChange={(e) => handleInputChange("momoNumber", e.target.value)}
                          placeholder="0XX XXX XXXX" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="network">Network *</Label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={formData.momoNetwork}
                          onChange={(e) => handleInputChange("momoNetwork", e.target.value)}
                        >
                          <option value="MTN">MTN Mobile Money</option>
                          <option value="AirtelTigo">AirtelTigo Money</option>
                          <option value="Vodafone">Vodafone Cash</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800 text-sm font-medium mb-2">
                      <Shield className="h-4 w-4" />
                      Security & Guarantees
                    </div>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• 256-bit SSL encryption</li>
                      <li>• 7-day money back guarantee</li>
                      <li>• PCI DSS compliant</li>
                      <li>• Secure payment processing</li>
                    </ul>
                  </div>

                  <div className="flex items-start gap-3 p-4 border rounded-lg">
                    <Checkbox 
                      id="terms" 
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                      I agree to the <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>. I understand that my access will begin immediately after payment confirmation.
                    </Label>
                  </div>

                  <Button 
                    onClick={handleCheckout}
                    disabled={isProcessing || !acceptTerms}
                    className="w-full bg-green-600 hover:bg-green-700 py-3 text-lg"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5 mr-2" />
                        Complete Purchase - GHS {total}
                      </>
                    )}
                  </Button>

                  <div className="text-center text-sm text-gray-600">
                    <Shield className="h-4 w-4 inline mr-1" />
                    Your payment is protected by industry-standard security
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
