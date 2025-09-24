const CustomLegend = ({ payload }: any) => (
    <div
        style={{
            marginTop: -225,
            marginLeft: 150,
            width: 400,
            height: 150,
            overflowY: "auto",
            padding: "5px",
        }}
    >
        {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
                <div
                    style={{
                        width: 12,
                        height: 12,
                        backgroundColor: entry.color,
                        marginRight: 8,
                    }}
                />
                <span>{entry.value}</span>
            </div>
        ))}
    </div>
)

export default CustomLegend