import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Edit, Trash2, MapPin, Route } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import TripMap from "@/components/maps/TripMap";

interface TripCardProps {
  thumbnail?: string;
  destination?: string;
  startPoint?: string;
  startDate?: string;
  endDate?: string;
  status?: "upcoming" | "past";
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: (link: string) => void;
}

const TripCard = ({
  thumbnail = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
  destination = "Road Trip Adventure",
  startPoint = "Starting Point",
  startDate = "2024-06-01",
  endDate = "2024-06-07",
  status = "upcoming",
  onEdit = () => {},
  onDelete = () => {},
  onShare = () => {},
}: TripCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showShareDialog, setShowShareDialog] = React.useState(false);
  const [showMapDialog, setShowMapDialog] = React.useState(false);
  const shareLink = `https://roadtrip.example.com/trips/${Math.random().toString(36).substring(7)}`;

  return (
    <Card className="w-[350px] h-[400px] bg-white overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <img
            src={thumbnail}
            alt={destination}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${status === "upcoming" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{destination}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{startPoint}</span>
        </div>
        <p className="text-gray-600 text-sm">
          {new Date(startDate).toLocaleDateString()} -{" "}
          {new Date(endDate).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowMapDialog(true)}
        >
          <Route className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowShareDialog(true)}
        >
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onEdit}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Trip</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this trip? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete();
                setShowDeleteDialog(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Trip</DialogTitle>
            <DialogDescription>
              Share this trip with your friends and family.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              readOnly
              value={shareLink}
              onClick={(e) => e.currentTarget.select()}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(shareLink);
                onShare(shareLink);
                setShowShareDialog(false);
              }}
            >
              Copy Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Trip Route</DialogTitle>
            <DialogDescription>
              View the route from {startPoint} to {destination}
            </DialogDescription>
          </DialogHeader>
          <div className="h-[400px] mt-4">
            <TripMap
              startPoint={startPoint}
              destination={destination}
              className="h-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TripCard;
