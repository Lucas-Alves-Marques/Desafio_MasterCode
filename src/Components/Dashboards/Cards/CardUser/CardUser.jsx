import { useEffect, useState } from 'react';
import Style from '../CardUser/CardUser.module.css';
import Card from '../Cards';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

function CardUser({ data }) {

    const [activeItems, setActiveItems] = useState(data?.map(item => item.name));

    const colors = ['red', 'green', 'blue', 'yellow'];

    const handleLegendClick = (data) => {

        const name = data.value;

        setActiveItems(prev =>

            prev.includes(name)
                ? prev.filter(item => item !== name)
                : [...prev, name]

        );

    };

    const filteredData = data?.filter(item => activeItems?.includes(item.name));


    return (

        <Card title={'Usuários Matriculados'}>

            <ul className={Style.list}>

                {data?.map((user) => (

                    <li>{user.name}</li>
                ))}

            </ul>

            {/* <PieChart width={400} height={400}>

                <Legend onClick={handleLegendClick} />
                <Pie
                    data={filteredData}
                    cx="50%"
                    cy="50%"
                    label
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value">

                    {filteredData.map((entry, index) => (

                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}

                </Pie>
                <Tooltip />

            </PieChart> */}

        </Card>

    )

}

export default CardUser;