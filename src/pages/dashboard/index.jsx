import React from "react"
import { useSelector } from "react-redux"
import { animated, useSpring } from "react-spring"
import useCategory from "../../hooks/useCategore"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const labels = ["January", "February", "March", "April", "May", "June", "July"]

function Index() {
  const Products = useSelector((state) => state.products.products)
  const Users = useSelector((state) => state.users.users)
  const { categories } = useCategory()

  const options = {
    responsive: true,
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Products",
        data: labels.map(() => Math.floor(Math.random() * Products.length)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Users",
        data: labels.map(() => Math.floor(Math.random() * Users.length)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Categories",
        data: labels.map(() => Math.floor(Math.random() * categories.length)),
        backgroundColor: "rgba(53, 235, 74, 0.5)",
      },
    ],
  }

  return (
    <div className="content-items-container">
      <Item name="Total of Products" amount={Products.length} />
      <Item name="Total of Categories" amount={categories.length} />
      <Item name="Total of Users" amount={Users.length} />

      <Bar
        data={data}
        options={options}
        style={{
          maxHeight: "400px",
        }}
      />
    </div>
  )
}

export default Index

const Item = ({ name, amount }) => {
  return (
    <div className="dashboard-main-content-item">
      <p className="content-item-name">{name}</p>
      <div className="content-item-amount">
        <AnimatedNumber ininNumber={amount} />
      </div>
    </div>
  )
}

const AnimatedNumber = ({ ininNumber }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: ininNumber,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  })
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
}
