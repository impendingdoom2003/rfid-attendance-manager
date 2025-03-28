
import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Scan, Check, X, AlertTriangle, Clock } from 'lucide-react';

const RFIDSimulator = () => {
  const { students, simulateRFIDScan, rfidEvents } = useApp();
  const [rfidInput, setRfidInput] = useState('');
  const [scanningActive, setScanningActive] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [lastScannedRFID, setLastScannedRFID] = useState('');

  const handleRFIDScan = () => {
    if (rfidInput.trim()) {
      simulateRFIDScan(rfidInput);
      setLastScannedRFID(rfidInput);
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 1000);
      setRfidInput('');
    }
  };

  const handleStudentCardClick = (rfidId: string) => {
    simulateRFIDScan(rfidId);
    setLastScannedRFID(rfidId);
    setPulseEffect(true);
    setTimeout(() => setPulseEffect(false), 1000);
  };

  useEffect(() => {
    let interval: number | null = null;
    
    if (scanningActive) {
      interval = window.setInterval(() => {
        setPulseEffect(prev => !prev);
      }, 1500);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [scanningActive]);

  const getEventStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'error':
        return <X className="h-4 w-4 text-red-600" />;
      case 'unknown':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">RFID Scanner Simulator</h1>
      
      <Tabs defaultValue="scan">
        <TabsList>
          <TabsTrigger value="scan">RFID Scanner</TabsTrigger>
          <TabsTrigger value="cards">Student Cards</TabsTrigger>
          <TabsTrigger value="events">Scan Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scan" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>RFID Scanner Simulation</CardTitle>
              <CardDescription>
                Simulate RFID card scanning to record student attendance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-6">
                <div className={`relative w-48 h-48 bg-rfid-lightBlue bg-opacity-10 rounded-full flex items-center justify-center mb-8 ${pulseEffect ? 'animate-pulse-ring' : ''}`}>
                  <div className={`absolute inset-0 rounded-full ${pulseEffect ? 'bg-rfid-lightBlue bg-opacity-30' : ''}`}></div>
                  <div className="w-32 h-32 bg-white rounded-full shadow-md flex items-center justify-center z-10">
                    <Scan className="h-16 w-16 text-rfid-blue" />
                  </div>
                </div>

                {lastScannedRFID && (
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-500">Last Scanned RFID:</p>
                    <p className="text-lg font-medium">{lastScannedRFID}</p>
                  </div>
                )}

                <div className="w-full max-w-sm space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter RFID Tag ID"
                      value={rfidInput}
                      onChange={(e) => setRfidInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleRFIDScan()}
                    />
                    <Button onClick={handleRFIDScan}>
                      Scan
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <Button
                      variant={scanningActive ? "destructive" : "outline"}
                      onClick={() => setScanningActive(!scanningActive)}
                    >
                      {scanningActive ? "Stop Auto Scanning" : "Start Auto Scanning"}
                    </Button>
                    
                    {scanningActive && (
                      <p className="text-sm text-gray-500 mt-2">
                        Auto-scanning is active. Click on student cards in the "Student Cards" tab to simulate scans.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cards" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Student RFID Cards</CardTitle>
              <CardDescription>
                Click on a card to simulate scanning that student's RFID card
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {students.map((student) => (
                  <Card 
                    key={student.id} 
                    className="cursor-pointer card-hover"
                    onClick={() => handleStudentCardClick(student.rfidId)}
                  >
                    <CardContent className="p-4 flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img 
                          src={student.imageUrl} 
                          alt={student.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{student.name}</h3>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className="text-xs px-2 py-0 bg-rfid-lightBlue bg-opacity-10">
                            {student.rfidId}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>RFID Scan Events</CardTitle>
              <CardDescription>
                Recent RFID card scanning events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rfidEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="flex items-start p-3 border rounded-lg animate-slide-in"
                  >
                    <div className={`mr-4 p-2 rounded-full ${
                      event.status === 'success' ? 'bg-green-100' :
                      event.status === 'error' ? 'bg-red-100' : 'bg-yellow-100'
                    }`}>
                      {getEventStatusIcon(event.status)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{event.message}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{formatTimestamp(event.timestamp)}</span>
                        <span className="mx-2">•</span>
                        <span>RFID: {event.rfidTag}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {rfidEvents.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    No RFID scan events recorded yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RFIDSimulator;
