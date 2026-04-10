import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });
      if (res.ok) {
        setStatus('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('Failed to send.');
      }
    } catch (err) {
      setStatus('Error sending message.');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-4 animate-in zoom-in-95 fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-1.5 text-foreground tracking-tight">
          Contact us
        </h1>
        <p className='mb-4 text-[0.9rem] opacity-50'>Suggest us about a new feature or provide<br/> a feedback.</p>
        <form className="space-y-3" onSubmit={handleSubmit}>
          {status && <div className="text-center font-bold text-foreground">{status}</div>}
          <div>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full name" />
          </div>
          <div>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email address"/>
          </div>
          <div>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="How can we help?" />
          </div>
          <Button type="submit">
              Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
