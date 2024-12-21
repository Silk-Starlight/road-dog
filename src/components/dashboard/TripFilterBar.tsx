import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TripFilterBarProps {
  onCreateTrip?: () => void;
  onFilterChange?: (filter: string) => void;
  selectedFilter?: string;
}

const TripFilterBar = ({
  onCreateTrip = () => {},
  onFilterChange = () => {},
  selectedFilter = "all",
}: TripFilterBarProps) => {
  return (
    <div className="w-full h-20 bg-white border-b px-6 flex items-center justify-between">
      <Button
        size="lg"
        onClick={onCreateTrip}
        className="bg-primary hover:bg-primary/90"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        Create New Trip
      </Button>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Filter by:</span>
        <Select
          value={selectedFilter}
          onValueChange={(value) => onFilterChange(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Trips</SelectItem>
            <SelectItem value="upcoming">Upcoming Trips</SelectItem>
            <SelectItem value="past">Past Trips</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TripFilterBar;
