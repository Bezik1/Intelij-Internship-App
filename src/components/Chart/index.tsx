import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts"
import CustomLegend from "../CustomLegend"

const Chart = ({ data, colors } : { data: any[], colors: string[] }) =>(
    <PieChart width={650} height={650} >
        <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={200}
            label={({ name, percent }) => `${(Number(percent) * 100).toFixed(0)}%`}
        >
        {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
        </Pie>
        <Legend
            layout="vertical"
            verticalAlign="bottom"
            align="center"
            content={<CustomLegend />}
        />
        <Tooltip />
    </PieChart>
)

export default Chart