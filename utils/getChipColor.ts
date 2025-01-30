export const chipConfig = {
  active: { color: "#22BB33", text: "Activo" },
  inactive: { color: "#f0ad4e", text: "Alerta" },
  error: { color: "#fe3839", text: "Error" },
} as const; // Ensures the object values are readonly and properly inferred

// Define the type for valid statuses
export type MeterStatus = keyof typeof chipConfig;
