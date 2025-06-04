import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
  Chip,
} from "@material-tailwind/react";
import { PencilIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const TablaDinamica = ({
  title,
  data,
  columns,
  searchKeys = [],
  filters = [],
  onEdit,
}) => {
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState(filters[0]?.value || "");

  const filtrar = (item) => {
    const coincideBusqueda = searchKeys.some((key) =>
      item[key]?.toLowerCase().includes(search.toLowerCase())
    );
    const coincideFiltro = filtro === "" || item.role === filtro || item.status === filtro;
    return coincideBusqueda && coincideFiltro;
  };

  const rows = data.filter(filtrar);

  return (
    <Card className="h-full w-full mt-10">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              {title}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Filtrá, buscá o editá los elementos de la tabla.
            </Typography>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          {filters.length > 0 && (
            <Tabs value={filtro} className="w-full md:w-max">
              <TabsHeader>
                {filters.map(({ label, value }) => (
                  <Tab key={value} value={value} onClick={() => setFiltro(value)}>
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
          )}

          <div className="w-full md:w-72">
            <Input
              label="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>

      <CardBody className="overflow-auto px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr className="bg-blue-gray-50/50">
              {columns.map((col) => (
                <th key={col.key} className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {col.label}
                  </Typography>
                </th>
              ))}
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {columns.map((col) => (
                  <td key={col.key} className="p-4">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                <td className="p-4">
                  {onEdit && (
                    <Tooltip content="Editar">
                      <IconButton variant="text" onClick={() => onEdit(row)}>
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="flex justify-end p-4 border-t border-blue-gray-50">
        <Typography variant="small" color="gray">
          Total: {rows.length} elemento(s)
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default TablaDinamica;
