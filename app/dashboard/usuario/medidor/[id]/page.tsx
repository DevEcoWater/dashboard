"use client";
import React from "react";
import { useMeter } from "@/hooks/useMeter";
import { chipConfig, MeterStatus } from "@/utils/getChipColor";
import Chip from "@/components/ui/chip";
import { Loader } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { useParams, usePathname } from "next/navigation";

const MeterDetails = () => {
  const { control } = useForm();
  const params = useParams();
  const pathname = usePathname();
  const { id } = params;

  const { data: meter, isLoading, error } = useMeter(id as string);

  if (error) return <p>Error: {(error as Error).message}</p>;
  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader />;
      </div>
    );
  if (!meter) return <p>No meter found</p>;

  const status = meter.status as MeterStatus;
  const { color, text } = chipConfig[status];

  return (
    <div className="flex flex-col items-center gap-4 p-6 w-full max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-center">Detalle del Medidor</h1>
      <p className="text-sm text-muted-foreground text-center">
        Acá podrás ver el detalle del medidor y el usuario
      </p>

      {/* Usuario Card */}
      <Card className="w-full p-4 shadow-lg">
        <CardContent className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-muted-foreground">
            Usuario
          </h3>
          <div className="grid gap-4">
            <div className="flex flex-col gap-1">
              <Label>Nombre</Label>
              <Controller
                control={control}
                name="username"
                defaultValue={meter.userId.username}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="username"
                    type="text"
                    disabled
                    className="bg-gray-100"
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Email</Label>
              <Controller
                control={control}
                name="email"
                defaultValue={meter.userId.email}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    disabled
                    className="bg-gray-100"
                  />
                )}
              />
            </div>
          </div>

          {/* Medidor Card */}
          <h3 className="text-lg font-semibold text-muted-foreground">
            Medidor
          </h3>
          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <Label>Estado</Label>
              <Chip text={text} backgroundColor={color} />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Dirección</Label>
              <Controller
                control={control}
                name="address"
                defaultValue={meter.address}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="address"
                    type="text"
                    disabled
                    className="bg-gray-100"
                  />
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeterDetails;
