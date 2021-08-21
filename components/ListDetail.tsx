import * as React from 'react'

import { note } from '../interfaces'

type ListDetailProps = {
  item: note
}

const ListDetail = ({ item: user }: ListDetailProps) => (
  <div>
    <h1>Detail for {user.mainname}</h1>
    <p>ID: {user.id}</p>
  </div>
)

export default ListDetail
