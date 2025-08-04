import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import RegistrarUsuario from './RegistrarUsuario';
import AsignarModulos from './AsignarModulos';
import '../styles/dashboard.css';

// 🔠 Capitaliza los nombres para visualización
const formatoTitulo = (texto) => {
  if (!texto) return '';
  return texto
    .replace(/_/g, ' ')
    .replace(/\b\w/g, letra => letra.toUpperCase());
};

// 🧩 Submódulos que tienen una vista implementada
const submoduloComponents = {
  registrar_usuarios: RegistrarUsuario,
  asignacion_de_modulos: AsignarModulos,
  // 👉 futuros submódulos con vista irán aquí
};

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [modulesData, setModulesData] = useState([]);
  const [expandedModuleId, setExpandedModuleId] = useState(null);
  const [selectedSubmoduleId, setSelectedSubmoduleId] = useState(null);

  useEffect(() => {
    const loadMenu = async () => {
      if (!user?.role_id) return;

      try {
        const res = await axios.get(`http://localhost:3001/api/menu/${user.role_id}`);
        setModulesData(res.data);

        const savedModuleId = localStorage.getItem('selectedModuleId');
        const savedSubmoduleId = localStorage.getItem('selectedSubmoduleId');

        if (savedModuleId) setExpandedModuleId(parseInt(savedModuleId));
        if (savedSubmoduleId) setSelectedSubmoduleId(parseInt(savedSubmoduleId));
      } catch (err) {
        console.error('Error cargando menú:', err);
      }
    };

    loadMenu();
  }, [user]);

  const toggleModule = (id) => {
    if (expandedModuleId === id) {
      setExpandedModuleId(null);
      localStorage.removeItem('selectedModuleId');
    } else {
      setExpandedModuleId(id);
      localStorage.setItem('selectedModuleId', id);
    }
    setSelectedSubmoduleId(null);
    localStorage.removeItem('selectedSubmoduleId');
  };

  const handleSubmoduleClick = (id) => {
    setSelectedSubmoduleId(id);
    localStorage.setItem('selectedSubmoduleId', id);
  };

  const handleLogout = () => {
    localStorage.clear();
    logout();
  };

  const selectedModule = modulesData.find(m => m.id === expandedModuleId);
  const selectedSubmodule = selectedModule?.submodulos.find(s => s.id === selectedSubmoduleId);

  return (
    <div className="dashboard-container">
      <button className="logout-btn" onClick={handleLogout}>
        Cerrar sesión
      </button>

      <nav className="sidebar">
        <h3>Menu</h3>
        <ul>
          {modulesData.map(mod => (
            <li key={mod.id}>
              <div
                className={`menu-module ${expandedModuleId === mod.id ? 'expanded active' : ''}`}
                onClick={() => toggleModule(mod.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleModule(mod.id)}
              >
                <i className={`fas ${mod.icon}`} style={{ marginRight: '8px' }}></i>
                {formatoTitulo(mod.name)}
              </div>
              {expandedModuleId === mod.id && mod.submodulos.length > 0 && (
                <ul className="submenu">
                  {mod.submodulos.map(sub => (
                    <li
                      key={sub.id}
                      className={`submodulo-item ${sub.id === selectedSubmoduleId ? 'active' : ''}`}
                      onClick={() => handleSubmoduleClick(sub.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmoduleClick(sub.id)}
                    >
                      <i className={`fas ${sub.icon}`} style={{ marginRight: '6px' }}></i>
                      {formatoTitulo(sub.name)}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <main className="main-content">
        {selectedSubmodule ? (
          (() => {
            const SubmoduloComponent = submoduloComponents[selectedSubmodule.name];
            return SubmoduloComponent ? (
              <SubmoduloComponent idAdmin={user?.id || parseInt(localStorage.getItem('id_admin'))} />
            ) : (
              <>
                <h2>{formatoTitulo(selectedSubmodule.name)}</h2>
                <p>Esta vista aún no tiene contenido asignado.</p>
              </>
            );
          })()
        ) : (
          <h2>Bienvenido al sistema</h2>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
