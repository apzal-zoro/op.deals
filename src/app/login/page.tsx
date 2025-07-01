'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

// SVGs for social icons (Lucide doesn't have brand icons)
const SteamIcon = () => <svg role="img" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Steam</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25zM9.54 8.789l-2.02 1.614 1.135 1.51-1.39.993-2.12-2.82.915-.688 2.56 1.94-.08-3.08h2.09l-.1 3.535 4.28-3.535h2.46l-4.78 3.92 3.1 4.14-.91.68-2.31-3.08-2.61 2.12h-2.1l2.7-2.2-1.04-1.39zm3.83 2.055l.895-1.08.01.01 1.775 2.155-1.125.925-.875-1.065-.01-.01-1.78-2.155 1.11-.92z"/></svg>;
const FacebookIcon = () => <svg role="img" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const GoogleIcon = () => <svg role="img" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Google</title><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.386-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.85l3.25-3.138C18.189 1.186 15.479 0 12.24 0 5.48 0 0 5.48 0 12s5.48 12 12.24 12c6.885 0 11.72-4.815 11.72-11.798 0-.748-.088-1.42-.204-2.096H12.24z"/></svg>;
const DiscordIcon = () => <svg role="img" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Discord</title><path d="M20.222 0c-1.34.605-2.585 1.04-3.75 1.34-.975-.5-1.995-1.01-2.925-1.34-1.74-.605-3.36-1.155-5.28-.68-3.015.77-4.635 3.435-5.28 6.045-.645 2.61.12 5.31 1.245 7.695.735 1.545 1.74 2.895 3.03 4.05 1.125 1.01 2.37 1.845 3.75 2.475 2.115.955 4.395.955 6.375 0 1.38-.63 2.625-1.465 3.75-2.475 1.29-1.155 2.295-2.505 3.03-4.05.99-2.1.99-4.335.525-6.525-.465-2.19-1.845-4.425-4.095-5.745a10.61 10.61 0 00-2.925-1.34zM9.547 15.825c-.84 0-1.515-.705-1.515-1.575s.675-1.575 1.515-1.575c.84 0 1.515.705 1.515 1.575s-.675 1.575-1.515 1.575zm4.905 0c-.84 0-1.515-.705-1.515-1.575s.675-1.575 1.515-1.575c.84 0 1.515.705 1.515 1.575s-.675 1.575-1.515 1.575z"/></svg>;
const TwitchIcon = () => <svg role="img" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><title>Twitch</title><path d="M2.149 0l-2.15 4.56v15.88h5.45v3.56h3.21l3.22-3.56h4.56l7.67-7.67V0H2.149zm19.14 13.1-4.04 4.04h-5.69l-3.22 3.56v-3.56H3.71V1.56h17.58v11.54zm-8.87-2.67h-2.7v5.45h2.7V10.43zm5.45 0h-2.7v5.45h2.7V10.43z"/></svg>;

export default function LoginPage() {
    return (
        <MainLayout>
            <div className="flex justify-center items-start py-12">
                <Card className="w-full max-w-4xl bg-card/80 backdrop-blur-sm rounded-lg p-8">
                    <CardHeader className="text-center p-0 mb-8">
                        <CardTitle className="text-3xl text-primary">Sign In</CardTitle>
                        <CardDescription>Please enter your details.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:gap-8 items-start">
                            {/* Left Side: Email Login */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address or Username</Label>
                                    <Input id="email" type="email" placeholder="Enter your email or username" className="h-11" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
                                            Can't remember your password?
                                        </Link>
                                    </div>
                                    <Input id="password" type="password" placeholder="Enter your password" className="h-11" />
                                </div>
                                <Button className="w-full text-lg h-12 rounded-md">Sign In</Button>
                                <p className="text-center text-sm text-muted-foreground">
                                    New here? <Link href="#" className="text-primary hover:underline">Create Account</Link>
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="relative my-6 md:my-0 md:h-full flex md:flex-col items-center justify-center">
                                <div className="w-full h-px md:w-px md:h-full bg-border" />
                                <span className="absolute bg-card/80 px-2 text-sm text-muted-foreground">
                                    OR
                                </span>
                            </div>

                            {/* Right Side: Social Login */}
                            <div className="space-y-4">
                                <Button variant="outline" className="w-full justify-center text-base rounded-md ring-1 ring-primary relative h-11">
                                    <SteamIcon />
                                    <span>Sign in with Steam*</span>
                                    <span className="absolute -top-2 right-4 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">Recommended</span>
                                </Button>
                                <Button variant="outline" className="w-full justify-center text-base rounded-md h-11">
                                    <FacebookIcon />
                                    Sign in with Facebook
                                </Button>
                                <Button variant="outline" className="w-full justify-center text-base rounded-md h-11">
                                    <GoogleIcon />
                                    Sign in with Google
                                </Button>
                                <Button variant="outline" className="w-full justify-center text-base rounded-md h-11">
                                    <DiscordIcon />
                                    Sign in with Discord
                                </Button>
                                <Button variant="outline" className="w-full justify-center text-base rounded-md h-11">
                                    <TwitchIcon />
                                    Sign in with Twitch
                                </Button>
                                <p className="text-xs text-muted-foreground text-center pt-2">
                                    *Sync your Steam wishlist & library for personalized deals!
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
