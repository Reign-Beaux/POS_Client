import { POSReducer } from "@/redux";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export interface ProtectedRouteProps {
  element: ReactNode;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, path }) => {
  const { features } = useSelector((store: POSReducer) => store.session);
  
  if (!features) return <Navigate to="/login" />;
  const hasAccess = features.some((feature) => feature.direction === path);
  
  if (features.length === 0) return <Navigate to="/login" />;
  if (path === "/" && features.length > 0) return <>{element}</>;
  if (!hasAccess) return <Navigate to="/" />;

  return <>{element}</>;
};

export default ProtectedRoute;
