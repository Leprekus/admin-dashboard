import { Button } from '@/components/ui/button';
import { SignInButton, SignOutButton, SignUpButton } from '@clerk/nextjs';
import { mainModule } from 'process';

export default function Home() {
  return (
  <main>
    <Button>log out</Button>
    <SignOutButton>Sign Out</SignOutButton>
    <SignInButton>Sign In</SignInButton>
  </main>)

}
