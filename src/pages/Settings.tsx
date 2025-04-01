
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Card className="border-app-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-xl text-app-gray-900 flex items-center gap-2">
            <SettingsIcon size={20} className="text-app-blue" />
            Application Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-app-gray-600 mb-6">
            Customize your NextSkill experience with these options.
          </p>
          
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-medium text-app-gray-900">Theme Preferences</h3>
              <div className="flex gap-3">
                <Button variant="outline" className="border-app-gray-300 text-app-gray-900 bg-app-gray-100">
                  Light (Default)
                </Button>
                <Button variant="outline" className="border-app-gray-300 text-app-gray-500">
                  Dark
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-app-gray-900">Notifications</h3>
              <div className="flex items-center justify-between p-3 border border-app-gray-200 rounded-md">
                <span className="text-app-gray-900">Email Notifications</span>
                <Button variant="outline" size="sm" className="border-app-blue text-app-blue hover:bg-app-blue/10">
                  Enabled
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
