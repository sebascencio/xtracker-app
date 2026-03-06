"use client"

import { useMemo } from 'react'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, ReferenceLine } from 'recharts'
import type { PricePoint } from '@/lib/types'

interface PriceChartProps {
  data: PricePoint[]
  lowestPrice: number
  highestPrice: number
  currentPrice: number
}

export function PriceChart({ data, lowestPrice, highestPrice, currentPrice }: PriceChartProps) {
  const chartData = useMemo(() => {
    return data.map(point => ({
      ...point,
      formattedDate: new Date(point.date).toLocaleDateString('es-ES', { 
        month: 'short', 
        day: 'numeric' 
      })
    }))
  }, [data])

  const minPrice = Math.min(...data.map(d => d.price)) * 0.9
  const maxPrice = Math.max(...data.map(d => d.price)) * 1.1

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(142, 76%, 45%)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="hsl(142, 76%, 45%)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="formattedDate" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(0 0% 55%)', fontSize: 10 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            domain={[minPrice, maxPrice]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(0 0% 55%)', fontSize: 10 }}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
            width={45}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(0 0% 12%)',
              border: '1px solid hsl(0 0% 22%)',
              borderRadius: '12px',
              padding: '8px 12px',
            }}
            labelStyle={{ color: 'hsl(0 0% 55%)', fontSize: 11 }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Precio']}
            itemStyle={{ color: 'hsl(142, 76%, 45%)' }}
          />
          <ReferenceLine 
            y={lowestPrice} 
            stroke="hsl(142, 76%, 45%)" 
            strokeDasharray="4 4" 
            strokeOpacity={0.5}
          />
          <ReferenceLine 
            y={highestPrice} 
            stroke="hsl(0 0% 40%)" 
            strokeDasharray="4 4" 
            strokeOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="hsl(142, 76%, 45%)"
            strokeWidth={2}
            fill="url(#priceGradient)"
            dot={false}
            activeDot={{ 
              r: 4, 
              fill: 'hsl(142, 76%, 45%)',
              stroke: 'hsl(0 0% 12%)',
              strokeWidth: 2
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
