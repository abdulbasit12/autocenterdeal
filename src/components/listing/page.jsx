import React, { useState, useEffect } from 'react'
import { getItems } from '../../functions/API'
import Loading from '../shared/loading'
import { useDebounce } from '../shared/useDebounce'
import { AppProvider } from '../shared/contextAPI'
import Layout from './layout'

function Page() {

  return (
    <AppProvider>
      <Layout/>
    </AppProvider>
  )
}

export default Page