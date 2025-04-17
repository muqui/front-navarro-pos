import React from 'react'
import Menu from '../components/Menu'
import { SellsTable } from '../mocks/SellsTable'
import { IncomeTable } from '../mocks/IncomeTable'
import { ExpensesTable } from '../mocks/ExpensesTable'
import { CompleteTable } from '../mocks/CompleteTable'
export const Report = () => {
  return (
    <>
      <Menu />
      <div className="container mt-4">


        {/* Nav tabs */}
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#sells"
              type="button"
              role="tab"
              aria-controls="sells"
              aria-selected="true"
            >
              Ventas
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#income"
              type="button"
              role="tab"
              aria-controls="income"
              aria-selected="false"
            >
              Ingresos
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#expenses"
              type="button"
              role="tab"
              aria-controls="expenses"
              aria-selected="false"
            >
              Egresos
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#complete"
              type="button"
              role="tab"
              aria-controls="complete"
              aria-selected="false"
            >
              Completo
            </button>
          </li>

        </ul>

        {/* Tab panes */}
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="sells"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="p-3">
              <SellsTable/>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="income"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="p-3">
              <IncomeTable/>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="expenses"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="p-3">
              <ExpensesTable/>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="complete"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="p-3">
              <CompleteTable/>
            </div>
          </div>

        </div>
      </div>
    </>

  )
}
