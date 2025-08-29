import React, { useState } from 'react';

interface RegisterFormProps {
  onRegister: (userData: any) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    // Datos básicos
    email: '',
    password: '',
    confirmPassword: '',
    
    // Datos personales
    firstName: '',
    lastName: '',
    middleName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    
    // Documentos
    documentType: '',
    documentNumber: '',
    passportNumber: '',
    
    // Contacto
    phone: '',
    alternatePhone: '',
    
    // Dirección
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    
    // Información laboral
    occupation: '',
    company: '',
    workAddress: '',
    workPhone: '',
    monthlyIncome: '',
    
    // Información académica
    educationLevel: '',
    university: '',
    degree: '',
    graduationYear: '',
    
    // Información familiar
    maritalStatus: '',
    spouseName: '',
    numberOfChildren: '',
    
    // Contacto de emergencia
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactPhone: '',
    
    // Información médica
    bloodType: '',
    allergies: '',
    medicalConditions: '',
    
    // Preferencias
    preferredLanguage: '',
    newsletter: false,
    notifications: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { title: 'Datos de Acceso', fields: ['email', 'password', 'confirmPassword'] },
    { title: 'Información Personal', fields: ['firstName', 'lastName', 'middleName', 'dateOfBirth', 'gender', 'nationality'] },
    { title: 'Documentos', fields: ['documentType', 'documentNumber', 'passportNumber'] },
    { title: 'Contacto', fields: ['phone', 'alternatePhone'] },
    { title: 'Dirección', fields: ['address', 'city', 'state', 'postalCode', 'country'] },
    { title: 'Información Laboral', fields: ['occupation', 'company', 'workAddress', 'workPhone', 'monthlyIncome'] },
    { title: 'Educación', fields: ['educationLevel', 'university', 'degree', 'graduationYear'] },
    { title: 'Información Familiar', fields: ['maritalStatus', 'spouseName', 'numberOfChildren'] },
    { title: 'Contacto de Emergencia', fields: ['emergencyContactName', 'emergencyContactRelation', 'emergencyContactPhone'] },
    { title: 'Información Médica', fields: ['bloodType', 'allergies', 'medicalConditions'] },
    { title: 'Preferencias', fields: ['preferredLanguage', 'newsletter', 'notifications'] }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onRegister(data.user);
      } else {
        setError(data.message || 'Error al registrar usuario');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field: string) => {
    const fieldLabels: { [key: string]: string } = {
      email: 'Correo electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      firstName: 'Nombre',
      lastName: 'Apellido',
      middleName: 'Segundo nombre',
      dateOfBirth: 'Fecha de nacimiento',
      gender: 'Género',
      nationality: 'Nacionalidad',
      documentType: 'Tipo de documento',
      documentNumber: 'Número de documento',
      passportNumber: 'Número de pasaporte',
      phone: 'Teléfono',
      alternatePhone: 'Teléfono alternativo',
      address: 'Dirección',
      city: 'Ciudad',
      state: 'Estado/Provincia',
      postalCode: 'Código postal',
      country: 'País',
      occupation: 'Ocupación',
      company: 'Empresa',
      workAddress: 'Dirección de trabajo',
      workPhone: 'Teléfono de trabajo',
      monthlyIncome: 'Ingresos mensuales',
      educationLevel: 'Nivel educativo',
      university: 'Universidad',
      degree: 'Título/Carrera',
      graduationYear: 'Año de graduación',
      maritalStatus: 'Estado civil',
      spouseName: 'Nombre del cónyuge',
      numberOfChildren: 'Número de hijos',
      emergencyContactName: 'Nombre contacto emergencia',
      emergencyContactRelation: 'Relación',
      emergencyContactPhone: 'Teléfono emergencia',
      bloodType: 'Tipo de sangre',
      allergies: 'Alergias',
      medicalConditions: 'Condiciones médicas',
      preferredLanguage: 'Idioma preferido'
    };

    const selectOptions: { [key: string]: string[] } = {
      gender: ['Masculino', 'Femenino', 'Otro', 'Prefiero no decir'],
      documentType: ['DNI', 'Cédula', 'Pasaporte', 'Licencia'],
      educationLevel: ['Primaria', 'Secundaria', 'Técnico', 'Universitario', 'Postgrado'],
      maritalStatus: ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a', 'Unión libre'],
      emergencyContactRelation: ['Padre/Madre', 'Hermano/a', 'Cónyuge', 'Hijo/a', 'Amigo/a', 'Otro'],
      bloodType: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      preferredLanguage: ['Español', 'Inglés', 'Francés', 'Portugués', 'Otro']
    };

    if (field === 'newsletter' || field === 'notifications') {
      return (
        <label key={field} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData[field as keyof typeof formData] as boolean}
            onChange={(e) => handleInputChange(field, e.target.checked)}
            className="w-4 h-4 text-gray-600 border-2 border-gray-800 rounded focus:ring-gray-500"
          />
          <span className="text-sm text-gray-700">
            {field === 'newsletter' ? 'Recibir newsletter' : 'Recibir notificaciones'}
          </span>
        </label>
      );
    }

    if (selectOptions[field]) {
      return (
        <div key={field}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {fieldLabels[field]}
          </label>
          <select
            value={formData[field as keyof typeof formData] as string}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
          >
            <option value="">Seleccionar...</option>
            {selectOptions[field].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      );
    }

    const inputType = field === 'email' ? 'email' :
                     field.includes('password') ? 'password' :
                     field === 'dateOfBirth' ? 'date' :
                     field.includes('phone') || field === 'monthlyIncome' || field === 'numberOfChildren' || field === 'graduationYear' ? 'tel' :
                     'text';

    return (
      <div key={field}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {fieldLabels[field]}
        </label>
        <input
          type={inputType}
          placeholder={fieldLabels[field]}
          value={formData[field as keyof typeof formData] as string}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full px-3 py-2 border-2 border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
        />
      </div>
    );
  };

  return (
    <div className="max-h-96 overflow-y-auto">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {sections[currentSection].title}
          </h3>
          <span className="text-sm text-gray-600">
            {currentSection + 1} de {sections.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gray-800 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          {sections[currentSection].fields.map(field => renderField(field))}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          {currentSection === sections.length - 1 ? (
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Siguiente
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;