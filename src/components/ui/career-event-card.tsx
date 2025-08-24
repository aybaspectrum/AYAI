import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Briefcase, GraduationCap, Star } from "lucide-react";
import { type CareerEvent, CareerEventType } from "@prisma/client";
import { motion } from "framer-motion";

interface CareerEventCardProps {
  event: CareerEvent;
}

const getIcon = (type: CareerEventType) => {
  switch (type) {
    case CareerEventType.JOB:
      return <Briefcase className="w-6 h-6 text-primary" />;
    case CareerEventType.EDUCATION:
      return <GraduationCap className="w-6 h-6 text-primary" />;
    case CareerEventType.PROJECT:
    case CareerEventType.ACCOMPLISHMENT:
      return <Star className="w-6 h-6 text-primary" />;
    default:
      return null;
  }
};

export const CareerEventCard = ({ event }: CareerEventCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
      className="h-full"
    >
      <Card className="h-full bg-card/50 backdrop-blur-sm border border-border/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                {getIcon(event.type)}
              </div>
              <div>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription>{event.organization}</CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="capitalize">
              {event.type.toLowerCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4 text-justify">{event.description}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(event.startDate).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}{" "}
            -{" "}
            {event.endDate
              ? new Date(event.endDate).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              : "Present"}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
