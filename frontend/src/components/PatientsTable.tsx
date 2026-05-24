"use client";

import { useEffect, useState } from "react";

import { getPatients, Patient } from "@/services/api";

export function PatientsTable() {
  const [patients, setPatients] = useState<Patient[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPatients() {
      try {
        const data = await getPatients();

        setPatients(data);
      } catch (err) {
        setError("Erro ao carregar pacientes.");
      } finally {
        setLoading(false);
      }
    }

    loadPatients();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <p>Carregando pacientes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-8 overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Pacientes Cadastrados
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 text-gray-700 font-semibold">Nome</th>

            <th className="text-left py-3 text-gray-700 font-semibold">CPF</th>

            <th className="text-left py-3 text-gray-700 font-semibold">
              Cidade
            </th>

            <th className="text-left py-3 text-gray-700 font-semibold">
              Telefone
            </th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className="border-b hover:bg-gray-50">
              <td className="py-3 text-gray-800">{patient.name}</td>

              <td className="py-3 text-gray-800">{patient.cpf}</td>

              <td className="py-3 text-gray-800">{patient.city}</td>

              <td className="py-3 text-gray-800">{patient.phone || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
