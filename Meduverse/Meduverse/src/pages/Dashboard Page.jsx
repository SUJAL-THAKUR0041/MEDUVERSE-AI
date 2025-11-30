import React from "react";
import { geminiClient } from "../api/groq";
import { mockAuth } from "../api/mockAuth";
import { localStorage } from "../api/localStorage";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Bell, 
  TrendingUp,
  Calendar,
  Stethoscope,
  Shield,
  AlertTriangle,
  Activity,
  Video,
  Brain,
  Pill,
  Building,
  Users,
  BookOpen,
  Sparkles
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/Assistant/Animated Background";

export default function Dashboard() {
  const [user] = useState(mockAuth.currentUser);
  const [medicalProfile] = useState(localStorage.medicalProfile.get(mockAuth.currentUser.email));
  const [reminders] = useState(localStorage.medicationReminders?.get(mockAuth.currentUser.email) || []);
  const userLoading = false;



  if (!medicalProfile?.consent_given) {
    return (
      <AnimatedBackground variant="emerald">
        <div className="min-h-screen flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="max-w-2xl w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Heart className="w-12 h-12 text-white" fill="currentColor" />
                </motion.div>
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Welcome to Meduverse AI! 🎉
                </CardTitle>
                <p className="text-gray-600 mt-2 text-lg">
                  Your intelligent health companion is ready
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-600 p-4 rounded-lg">
                  <p className="text-sm text-emerald-900 leading-relaxed">
                    <strong>Important:</strong> This AI assistant is for health guidance and wellness support. 
                    <span className="font-semibold"> It is NOT a substitute for professional medical diagnosis.</span> 
                    In case of emergency, contact a doctor immediately or call 102/108.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-xl text-gray-900">How Meduverse AI Can Help:</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <motion.div 
                      className="flex items-start gap-3 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Stethoscope className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-gray-900">Health Assistant</p>
                        <p className="text-xs text-gray-600 mt-0.5">AI-powered medical guidance</p>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Hospital className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-gray-900">Hospital Finder</p>
                        <p className="text-xs text-gray-600 mt-0.5">Nearby hospitals & doctors</p>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Video className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-gray-900">Telemedicine</p>
                        <p className="text-xs text-gray-600 mt-0.5">Virtual consultations</p>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Shield className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-gray-900">Privacy First</p>
                        <p className="text-xs text-gray-600 mt-0.5">Consent-based data</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <Link to={createPageUrl("Profile")} className="block">
                  <Button className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white py-6 text-lg font-semibold shadow-xl">
                    Complete Your Medical Profile →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </AnimatedBackground>
    );
  }

  const todayReminders = reminders.filter(r => {
    const today = new Date().toDateString();
    return new Date(r.start_date).toDateString() === today;
  });

  return (
    <AnimatedBackground variant="emerald">
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* 3D Doctor Robot Header */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="text-8xl mb-4"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🤖
          </motion.div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Namaste, {user?.full_name?.split(' ')[0] || 'Friend'}! 👋
          </h1>
          <p className="text-xl text-gray-700">How can I assist with your health today?</p>
        </motion.div>

        {/* Medical Services Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Stethoscope className="w-7 h-7 text-emerald-600" />
            Medical Services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to={createPageUrl("DoctorAgent")}>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Card className="cursor-pointer border-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-xl hover:shadow-2xl transition-all">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Stethoscope className="w-12 h-12 mb-3 mx-auto" />
                    </motion.div>
                    <h3 className="font-bold text-xl mb-1">Dr. AI</h3>
                    <p className="text-sm text-emerald-100">Virtual Doctor</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>

            <Link to={createPageUrl("MedicalAnalysis")}>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Card className="cursor-pointer border-0 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 text-white shadow-xl hover:shadow-2xl transition-all">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Brain className="w-12 h-12 mb-3 mx-auto" />
                    </motion.div>
                    <h3 className="font-bold text-xl mb-1">AI Analysis</h3>
                    <p className="text-sm text-purple-100">Symptom checker</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>

            <Link to={createPageUrl("HospitalFinder")}>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Card className="cursor-pointer border-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white shadow-xl hover:shadow-2xl transition-all">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Hospital className="w-12 h-12 mb-3 mx-auto" />
                    </motion.div>
                    <h3 className="font-bold text-xl mb-1">Hospitals</h3>
                    <p className="text-sm text-blue-100">Find nearby</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>

            <Link to={createPageUrl("Telemedicine")}>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Card className="cursor-pointer border-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white shadow-xl hover:shadow-2xl transition-all">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Video className="w-12 h-12 mb-3 mx-auto" />
                    </motion.div>
                    <h3 className="font-bold text-xl mb-1">Telemedicine</h3>
                    <p className="text-sm text-orange-100">Video consult</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>

            <Link to={createPageUrl("DoctorNetwork")}>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Card className="cursor-pointer border-0 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 text-white shadow-xl hover:shadow-2xl transition-all">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Users className="w-12 h-12 mb-3 mx-auto" />
                    </motion.div>
                    <h3 className="font-bold text-xl mb-1">Doctors</h3>
                    <p className="text-sm text-cyan-100">Find specialists</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>

            <Link to={createPageUrl("MedicationReminders")}>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Card className="cursor-pointer border-0 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white shadow-xl hover:shadow-2xl transition-all">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      <Pill className="w-12 h-12 mb-3 mx-auto" />
                    </motion.div>
                    <h3 className="font-bold text-xl mb-1">Medications</h3>
                    <p className="text-sm text-green-100">{reminders.length} active</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>

            <Link to={createPageUrl("MedicalJournal")}>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Card className="cursor-pointer border-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl hover:shadow-2xl transition-all">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      animate={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <BookOpen className="w-12 h-12 mb-3 mx-auto" />
                    </motion.div>
                    <h3 className="font-bold text-xl mb-1">Journal</h3>
                    <p className="text-sm text-indigo-100">AI insights</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>

            <Link to={createPageUrl("HealthTips")}>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Card className="cursor-pointer border-0 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 text-white shadow-xl hover:shadow-2xl transition-all">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <Sparkles className="w-12 h-12 mb-3 mx-auto" />
                    </motion.div>
                    <h3 className="font-bold text-xl mb-1">Health Tips</h3>
                    <p className="text-sm text-yellow-100">Personalized</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Reminders */}
            {todayReminders.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                  <CardHeader className="pb-4 bg-gradient-to-r from-orange-50 to-yellow-50">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Bell className="w-6 h-6 text-orange-600" />
                      Today's Reminders
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-4">
                    {todayReminders.map((reminder, idx) => (
                      <motion.div
                        key={reminder.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl"
                      >
                        <div className="flex items-start gap-3">
                          <Pill className="w-6 h-6 text-orange-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{reminder.medication_name}</p>
                            <p className="text-sm text-gray-600">{reminder.dosage}</p>
                            <div className="flex gap-2 mt-2">
                              {reminder.time_slots.map((time, i) => (
                                <Badge key={i} variant="outline" className="bg-white">
                                  ⏰ {time}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-teal-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Activity className="w-6 h-6 text-emerald-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Link to={createPageUrl("HealthAnalytics")}>
                    <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white">
                      📊 Analytics
                    </Button>
                  </Link>
                  <Link to={createPageUrl("Profile")}>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      👤 Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Safety Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-red-50 to-orange-50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Shield className="w-6 h-6 text-red-600" />
                    Emergency
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Medical Disclaimer</p>
                      <p className="text-xs text-gray-600 mt-1">
                        AI assistant does not diagnose. Always consult a qualified doctor.
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t-2 border-red-100">
                    <a href="tel:102" className="block w-full py-4 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-bold rounded-xl text-center transition-all shadow-lg">
                      🚨 Emergency: Call 102/108
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Health Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Health Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                    <span className="text-sm font-medium text-gray-700">Active Medications</span>
                    <span className="font-bold text-2xl text-green-700">{reminders.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                    <span className="text-sm font-medium text-gray-700">Profile Status</span>
                    <Badge className="bg-green-600 text-white">✓ Complete</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}

