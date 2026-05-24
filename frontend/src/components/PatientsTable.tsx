"use client";

import { FormEvent, useEffect, useState } from "react";

import { createPatient, getPatients, Patient } from "@/services/api";

function onlyLetters(value: string) {
  return value.replace(/[0-9]/g, "");
}

function onlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

function maskCpf(value: string) {
  const numbers = onlyNumbers(value).slice(0, 11);

  return numbers
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function maskPhone(value: string) {
  const numbers = onlyNumbers(value).slice(0, 11);

  if (numbers.length <= 10) {
    return numbers
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return numbers
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

type PatientsTableProps = {
  onDataChange?: () => void;
};

export function PatientsTable({ onDataChange }: PatientsTableProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    birth_date: "",
    city: "",
    phone: "",
    health_card_number: "",
  });

  async function loadPatients() {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch {
      setError("Erro ao carregar pacientes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPatients();
  }, []);

  async function handleCreatePatient(event: FormEvent) {
    event.preventDefault();

    setCreating(true);
    setError("");

    try {
      await createPatient(formData);

      setFormData({
        name: "",
        cpf: "",
        birth_date: "",
        city: "",
        phone: "",
        health_card_number: "",
      });

      await loadPatients();
      onDataChange?.();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro ao cadastrar paciente.");
      }
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 md:p-6 mt-6 md:mt-8">
        <p className="text-gray-700">Carregando pacientes...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 md:p-6 mt-6 md:mt-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        Pacientes Cadastrados
      </h2>

      <form
        onSubmit={handleCreatePatient}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Nome"
          value={formData.name}
          onChange={(event) =>
            setFormData({
              ...formData,
              name: onlyLetters(event.target.value),
            })
          }
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
          required
        />

        <input
          type="text"
          placeholder="CPF"
          value={formData.cpf}
          onChange={(event) =>
            setFormData({
              ...formData,
              cpf: maskCpf(event.target.value),
            })
          }
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
          required
        />

        <input
          type="date"
          value={formData.birth_date}
          onChange={(event) =>
            setFormData({
              ...formData,
              birth_date: event.target.value,
            })
          }
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
          required
        />

        <input
          type="text"
          placeholder="Cidade"
          value={formData.city}
          onChange={(event) =>
            setFormData({
              ...formData,
              city: onlyLetters(event.target.value),
            })
          }
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
          required
        />

        <input
          type="text"
          placeholder="Telefone"
          value={formData.phone}
          onChange={(event) =>
            setFormData({
              ...formData,
              phone: maskPhone(event.target.value),
            })
          }
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
        />

        <input
          type="text"
          placeholder="Cartão SUS"
          value={formData.health_card_number}
          onChange={(event) =>
            setFormData({
              ...formData,
              health_card_number: onlyNumbers(event.target.value),
            })
          }
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-900"
        />

        <button
          type="submit"
          disabled={creating}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 disabled:opacity-60"
        >
          {creating ? "Cadastrando..." : "Cadastrar Paciente"}
        </button>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="md:hidden space-y-4">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="rounded-xl border border-gray-200 bg-gray-50 p-4"
          >
            <p className="font-semibold text-gray-900">{patient.name}</p>
            <p className="text-sm text-gray-700">CPF: {patient.cpf}</p>
            <p className="text-sm text-gray-700">Cidade: {patient.city}</p>
            <p className="text-sm text-gray-700">
              Telefone: {patient.phone || "-"}
            </p>
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 text-gray-700 font-semibold">
                Nome
              </th>
              <th className="text-left py-3 text-gray-700 font-semibold">
                CPF
              </th>
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
                <td className="py-3 text-gray-800">
                  {patient.phone || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}