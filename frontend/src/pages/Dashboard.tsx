import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#111111', '#555555', '#999999', '#cccccc', '#eeeeee'];

export default function Dashboard() {
  const [data, setData] = useState({
    timeSpent: {},
    navigationFlow: {},
    mostVisitedPages: {},
    entrySources: {}
  });
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/analytics')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
      
    fetch('http://localhost:3000/api/contacts')
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(err => console.error(err));
  }, []);

  const timeSpentData = Object.entries(data.timeSpent).map(([name, value]) => ({ name, value }));
  const flowData = Object.entries(data.navigationFlow).map(([name, value]) => ({ name, value })).sort((a: any, b: any) => b.value - a.value).slice(0, 5);
  const visitedData = Object.entries(data.mostVisitedPages).map(([name, value]) => ({ name, value }));
  const sourcesData = Object.entries(data.entrySources).map(([name, value]) => ({ name, value }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col space-y-1.5 pl-1">
        <h2 className="text-3xl tracking-tight text-foreground font-bold drop-shadow-sm">Dashboard</h2>
        <p className='text-sm text-muted-foreground'>Track the interaction data and activities of all the users<br/> across pages.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 hidden">
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-accent/50 shadow-xl overflow-hidden group transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Time spent per page (seconds)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={timeSpentData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}s`} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', background: 'white', color: 'black' }} />
                <Bar dataKey="value" radius={[50, 50, 50, 50]} className="fill-primary group-hover:opacity-80 transition-colors" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-accent/50 shadow-xl overflow-hidden transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Entry sources</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie data={sourcesData} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} dataKey="value">
                  {sourcesData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', background: 'white', color: 'black' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-4 bg-accent/50 shadow-xl overflow-hidden transition-all duration-300">
          <CardHeader>
             <div className="flex items-center gap-2">
              <CardTitle>Most visited pages</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={visitedData} layout="vertical">
                <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', background: 'white', color: 'black' }} />
                <Bar dataKey="value" className="fill-primary" radius={[50, 50, 50, 50]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-accent/50 shadow-xl overflow-hidden transition-all duration-300">
          <CardHeader>
             <div className="flex items-center gap-2">
              <CardTitle>Top navigation flows</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {flowData.length === 0 && <p className="text-sm text-muted-foreground">No navigation data yet.</p>}
              {flowData.map((item: any, i) => (
                <div key={i} className="flex items-center">
                  <div className="space-y-1 w-full">
                    <p className="text-sm font-medium leading-none flex justify-between">
                      <span className="truncate max-w-[200px] font-medium text-xs">{item.name}</span>
                      <span className="text-foreground">{item.value} times</span>
                    </p>
                    <div className="w-full bg-black/10 dark:bg-white/10 h-1.5 mt-2 rounded-full overflow-hidden">
                      <div className="bg-black dark:bg-white h-full rounded-full" style={{ width: `${Math.min((Number(item.value) / (Number(flowData[0]?.value) || 1)) * 100, 100)}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 bg-accent/50 shadow-xl overflow-hidden transition-all duration-300">
        <CardHeader>
           <div className="flex items-center gap-2">
            <CardTitle>Recent Contact Messages</CardTitle>
          </div>
          <CardDescription>Messages sent via the Contact page.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contacts.length === 0 && <p className="text-sm text-muted-foreground">No messages yet.</p>}
            {contacts.map((msg, i) => (
              <div key={i} className="pb-4border-b border-primary-40">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-foreground">{msg.name}</h4>
                    <a href={`mailto:${msg.email}`} className="text-sm text-blue-500 hover:underline">{msg.email}</a>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(msg.date).toLocaleString()}</span>
                </div>
                <p className="text-sm text-foreground/80 whitespace-pre-wrap">{msg.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
