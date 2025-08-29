import React from 'react';
import { LogOut, User } from 'lucide-react';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b-2 border-gray-800 px-4 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <User className="w-8 h-8 text-gray-800" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Bienvenido</h1>
              <p className="text-gray-600">{user?.firstName} {user?.lastName}</p>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg border-2 border-gray-800 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Perfil de Usuario</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>
              <div className="space-y-2">
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Nombre completo:</strong> {user?.firstName} {user?.middleName} {user?.lastName}</p>
                <p><strong>Fecha de nacimiento:</strong> {user?.dateOfBirth}</p>
                <p><strong>Género:</strong> {user?.gender}</p>
                <p><strong>Nacionalidad:</strong> {user?.nationality}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contacto</h3>
              <div className="space-y-2">
                <p><strong>Teléfono:</strong> {user?.phone}</p>
                <p><strong>Teléfono alternativo:</strong> {user?.alternatePhone}</p>
                <p><strong>Dirección:</strong> {user?.address}</p>
                <p><strong>Ciudad:</strong> {user?.city}, {user?.state}</p>
                <p><strong>País:</strong> {user?.country}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Laboral</h3>
              <div className="space-y-2">
                <p><strong>Ocupación:</strong> {user?.occupation}</p>
                <p><strong>Empresa:</strong> {user?.company}</p>
                <p><strong>Ingresos mensuales:</strong> {user?.monthlyIncome}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Educación</h3>
              <div className="space-y-2">
                <p><strong>Nivel educativo:</strong> {user?.educationLevel}</p>
                <p><strong>Universidad:</strong> {user?.university}</p>
                <p><strong>Título:</strong> {user?.degree}</p>
                <p><strong>Año de graduación:</strong> {user?.graduationYear}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Estado del Registro</h3>
            <p className="text-green-600 font-medium">✓ Registro completado exitosamente</p>
            <p className="text-gray-600 text-sm mt-1">
              Todos tus datos han sido guardados de forma segura en nuestra base de datos.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;