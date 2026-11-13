'use client';

import Reports from '@/src/components/dashboard/Reports';
import { PageHeader } from '@/src/components/dashboard/ui';

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Clientes"
        title="Reportes"
        description="Pedidos de los clientes por día, semana, mes o año: totales, detalle por cliente y exportación a Excel."
      />
      <Reports />
    </>
  );
}
