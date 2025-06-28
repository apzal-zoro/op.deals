'use client';
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Computer, Gamepad, Gamepad2, Tablet } from "lucide-react";

const platforms = [
    {id: "all", label: "All platforms", icon: null},
    {id: "pc", label: "PC", icon: Computer},
    {id: "xbox", label: "Xbox", icon: Gamepad2},
    {id: "playstation", label: "PlayStation", icon: Gamepad},
    {id: "switch", label: "Switch", icon: Tablet},
];

export function PlatformSelector() {
    return (
        <div className="w-full flex justify-center bg-card/50 p-2 rounded-lg my-6">
            <RadioGroup defaultValue="all" className="flex items-center gap-2">
                {platforms.map(platform => (
                    <div key={platform.id} className="flex items-center">
                        <RadioGroupItem value={platform.id} id={`platform-${platform.id}`} className="peer sr-only" />
                        <Label 
                            htmlFor={`platform-${platform.id}`}
                            className="px-3 py-1.5 rounded-md text-sm cursor-pointer transition-colors peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:bg-secondary flex items-center gap-2"
                        >
                            {platform.icon && <platform.icon className="h-4 w-4"/>}
                            {platform.label}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}
