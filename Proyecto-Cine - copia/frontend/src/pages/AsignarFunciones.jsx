// src/pages/AsignarFunciones.jsx
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FabAdd from "../components/FabAdd";
import ModalAsignarFuncion from "../components/ModalAsignarFuncion";
import HoraChip from "../components/HoraChip";
import "../styles/funciones.css";

const API_BASE = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:3001';

// HH:MM -> minutos
const toMinutes = (hhmm = '') => {
  const [h, m] = String(hhmm).split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
};

export default function ProgramarFunciones() {
  // catálogos
  const [salas, setSalas] = useState([]);

  // datos
  const [funciones, setFunciones] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(''); // '' = todas

  // ui
  const [modalOpen, setModalOpen] = useState(false);
  const [modo, setModo] = useState('crear'); // 'crear' | 'editar'
  const [registroActivo, setRegistroActivo] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [reloadKey, setReloadKey] = useState(0); // para forzar recarga

  // ------- cargar salas (una sola vez) -------
  useEffect(() => {
    const loadSalas = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/funciones/select-data`);
        const arr = (data?.salas || []).map(s => ({
          id: Number(s.id ?? s.ID_SALA ?? s.ID),
          nombre: s.nombre ?? s.NOMBRE,
          capacidad: Number(s.capacidad ?? s.CAPACIDAD ?? 0),
        }));
        setSalas(arr);
      } catch (e) {
        console.error(e);
        toast.error('No se pudieron cargar las salas');
      }
    };
    loadSalas();
  }, []);

  // ------- cargar funciones (cuando cambia fecha o se pide reload) -------
  useEffect(() => {
    const loadFunciones = async () => {
      setCargando(true);
      try {
        const params = new URLSearchParams();
        if (fechaSeleccionada) params.set('fecha', fechaSeleccionada);
        const url = `${API_BASE}/api/funciones${params.toString() ? `?${params}` : ''}`;
        const { data } = await axios.get(url);

        const list = Array.isArray(data)
          ? data.map(f => ({
              id: Number(f.id),
              salaId: Number(f.salaId),
              peliculaId: Number(f.peliculaId),
              formatoId: Number(f.formatoId),
              idiomaId: Number(f.idiomaId),
              fecha: String(f.fecha),
              horaInicio: String(f.horaInicio).slice(0, 5),
              horaFinal: String(f.horaFinal).slice(0, 5),
              overnight: !!f.overnight,
              titulo: f.peliculaTitulo || '',
              formato: f.formato || '',
              precio: Number(f.precio || 0),
              poster: f.imagenUrl || ''
            }))
          : [];

        setFunciones(list);
      } catch (e) {
        console.error(e);
        toast.error('No se pudieron cargar las funciones');
      } finally {
        setCargando(false);
      }
    };

    loadFunciones();
  }, [fechaSeleccionada, reloadKey]);

  // ------- agrupar por sala y ordenar por hora -------
  const funcionesPorSala = useMemo(() => {
    const map = new Map();
    salas.forEach(s => map.set(s.id, []));
    funciones
      .filter(f => !fechaSeleccionada || f.fecha === fechaSeleccionada)
      .forEach(f => {
        if (!map.has(f.salaId)) map.set(f.salaId, []);
        map.get(f.salaId).push(f);
      });
    for (const arr of map.values()) {
      arr.sort((a, b) => toMinutes(a.horaInicio) - toMinutes(b.horaInicio));
    }
    return map;
  }, [salas, funciones, fechaSeleccionada]);

  // ------- modal helpers -------
  const abrirCrear = () => {
    setModo('crear');
    setRegistroActivo(null);
    setModalOpen(true);
  };

  const abrirVer = (f) => {
    setModo('editar');
    setRegistroActivo(f);
    setModalOpen(true);
  };

  const onProgramar = () => {
    setModalOpen(false);
    setReloadKey(k => k + 1);
  };

  const onEliminar = () => {
    setModalOpen(false);
    setReloadKey(k => k + 1);
  };

  return (
    <div className="container-fluid py-4">
      {/* Filtro por fecha */}
      <div className="mb-4 d-flex align-items-center gap-3">
        <label className="fw-bold">Seleccionar fecha:</label>
        <input
          type="date"
          className="form-control w-auto"
          value={fechaSeleccionada}
          onChange={(e) => setFechaSeleccionada(e.target.value)}
        />
        <button
          className="btn btn-outline-secondary"
          onClick={() => setFechaSeleccionada('')}
          disabled={!fechaSeleccionada}
        >
          Mostrar todas
        </button>
      </div>

      {/* Paneles por sala */}
      <div className="row g-4">
        {salas.map((sala) => (
          <div key={sala.id} className="col-12 col-md-6 col-lg-4">
            <div className="panel-sala">
              <div className="panel-sala__header">
                <div className="panel-sala__title">
                  <i className="fas fa-door-open me-2" />
                  {sala.nombre}
                </div>
                <span className="badge bg-light text-dark d-flex align-items-center gap-2">
                  <i className="fas fa-chair" />
                  {sala.capacidad} asientos
                </span>
              </div>

              <div className="panel-sala__body">
                {cargando ? (
                  <div className="text-center text-muted small py-4">Cargando…</div>
                ) : funcionesPorSala.get(sala.id)?.length ? (
                  funcionesPorSala.get(sala.id).map((f) => (
                    <HoraChip
                      key={f.id}
                      start={f.horaInicio}
                      end={f.horaFinal}
                      overnight={f.overnight}
                      title={f.titulo}
                      formato={f.formato}
                      price={f.precio}
                      poster={f.poster}
                      onClick={() => abrirVer(f)}
                    />
                  ))
                ) : (
                  <div className="text-center text-muted small py-4">No hay funciones programadas</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón flotante */}
      <FabAdd onClick={abrirCrear} />

      {/* Modal */}
      {modalOpen && (
        <ModalAsignarFuncion
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          modo={modo}
          salas={salas}
          registro={registroActivo}
          onProgramar={onProgramar}
          onEliminar={onEliminar}
        />
      )}
    </div>
  );
}
