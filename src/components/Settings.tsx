
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Wifi, Bluetooth, Database, Server, Clock, Shield, Bell } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">System Settings</h1>
      
      <Tabs defaultValue="hardware">
        <TabsList>
          <TabsTrigger value="hardware">Hardware</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hardware" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wifi className="mr-2 h-5 w-5 text-rfid-blue" />
                  Network Configuration
                </CardTitle>
                <CardDescription>Configure the RFID device network settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="wifi-ssid">WiFi SSID</Label>
                  <Input id="wifi-ssid" defaultValue="Campus_Wifi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wifi-password">WiFi Password</Label>
                  <Input id="wifi-password" type="password" defaultValue="••••••••••" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="wifi-switch">WiFi Enabled</Label>
                  <Switch id="wifi-switch" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Signal Strength</Label>
                  <div className="pt-2">
                    <Slider defaultValue={[75]} max={100} step={1} />
                  </div>
                  <div className="text-right text-sm text-gray-500">75%</div>
                </div>
                <Button className="w-full">Save Network Settings</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bluetooth className="mr-2 h-5 w-5 text-rfid-blue" />
                  RFID Reader Settings
                </CardTitle>
                <CardDescription>Configure the RFID reader hardware</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="device-id">Device ID</Label>
                  <Input id="device-id" defaultValue="RFID-READER-001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scan-interval">Scan Interval (ms)</Label>
                  <Input id="scan-interval" type="number" defaultValue="500" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="power-saving">Power Saving Mode</Label>
                  <Switch id="power-saving" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound-enabled">Sound Feedback</Label>
                  <Switch id="sound-enabled" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Reader Sensitivity</Label>
                  <div className="pt-2">
                    <Slider defaultValue={[85]} max={100} step={1} />
                  </div>
                  <div className="text-right text-sm text-gray-500">85%</div>
                </div>
                <Button className="w-full">Update Reader Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="database" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2 h-5 w-5 text-rfid-blue" />
                  Database Configuration
                </CardTitle>
                <CardDescription>Configure database connection settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="db-host">Database Host</Label>
                  <Input id="db-host" defaultValue="localhost" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-port">Database Port</Label>
                  <Input id="db-port" defaultValue="3306" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-name">Database Name</Label>
                  <Input id="db-name" defaultValue="rfid_attendance" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-user">Database User</Label>
                  <Input id="db-user" defaultValue="admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-password">Database Password</Label>
                  <Input id="db-password" type="password" defaultValue="••••••••••" />
                </div>
                <Button className="w-full">Test Connection</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="mr-2 h-5 w-5 text-rfid-blue" />
                  Data Management
                </CardTitle>
                <CardDescription>Manage database backup and maintenance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="backup-path">Backup Directory</Label>
                  <Input id="backup-path" defaultValue="/var/backups/rfid_system" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-backup">Automatic Backups</Label>
                  <Switch id="auto-backup" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-interval">Backup Interval (hours)</Label>
                  <Input id="backup-interval" type="number" defaultValue="24" />
                </div>
                <div className="space-y-2">
                  <Label>Data Retention Period (days)</Label>
                  <div className="pt-2">
                    <Slider defaultValue={[90]} max={365} step={1} />
                  </div>
                  <div className="text-right text-sm text-gray-500">90 days</div>
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1" variant="outline">Backup Now</Button>
                  <Button className="flex-1" variant="outline">Restore</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-rfid-blue" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-2">
                    <Label htmlFor="email-server">SMTP Server</Label>
                    <Input id="email-server" defaultValue="smtp.example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-port">SMTP Port</Label>
                    <Input id="email-port" defaultValue="587" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-user">Email User</Label>
                    <Input id="email-user" defaultValue="notifications@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-password">Email Password</Label>
                    <Input id="email-password" type="password" defaultValue="••••••••••" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-enabled">Email Notifications</Label>
                    <Switch id="email-enabled" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Triggers</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-late">Student Late Notifications</Label>
                      <Switch id="notify-late" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-absent">Student Absent Notifications</Label>
                      <Switch id="notify-absent" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-system">System Error Notifications</Label>
                      <Switch id="notify-system" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-backup">Backup Completion Notifications</Label>
                      <Switch id="notify-backup" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-unknown">Unknown RFID Notifications</Label>
                      <Switch id="notify-unknown" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="notify-recipients">Notification Recipients (comma separated)</Label>
                    <Input id="notify-recipients" defaultValue="admin@example.com, staff@example.com" />
                  </div>
                </div>
              </div>
              <Button className="w-full">Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-rfid-blue" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure system security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Access Control</h3>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Admin Password</Label>
                    <Input id="admin-password" type="password" defaultValue="••••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" defaultValue="••••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <Switch id="two-factor" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="encrypt-data">Encrypt Stored Data</Label>
                      <Switch id="encrypt-data" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ssl-enabled">Force SSL/TLS</Label>
                      <Switch id="ssl-enabled" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="log-access">Log Access Attempts</Label>
                      <Switch id="log-access" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ip-restrict">IP Restriction</Label>
                      <Switch id="ip-restrict" />
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="allowed-ips">Allowed IP Addresses (comma separated)</Label>
                    <Input id="allowed-ips" defaultValue="192.168.1.0/24, 10.0.0.0/8" />
                  </div>
                </div>
              </div>
              <Button className="w-full">Update Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
