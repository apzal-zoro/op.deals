'use client';
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const platforms = [
    {id: "all", label: "All platforms"},
    {id: "pc", label: "PC"},
    {id: "xbox", label: "Xbox"},
    {id: "playstation", label: "PlayStation"},
    {id: "switch", label: "Switch"},
];

export function PlatformSelector() {
    return (
        <div className="flex items-center gap-4 bg-card/50 p-2 rounded-lg">
            <RadioGroup defaultValue="all" className="flex items-center gap-2">
                {platforms.map(platform => (
                    <div key={platform.id} className="flex items-center">
                        <RadioGroupItem value={platform.id} id={`platform-${platform.id}`} className="peer sr-only" />
                        <Label 
                            htmlFor={`platform-${platform.id}`}
                            className="px-3 py-1.5 rounded-md text-sm cursor-pointer transition-colors peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:bg-secondary"
                        >
                            {platform.label}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    )
}
