"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Waves, Droplet, Shield, Calendar, Star, Plus } from 'lucide-react'

export default function PoolChemicalCalculator() {
  const [gallons, setGallons] = useState<string>('')
  const [fcNow, setFcNow] = useState<string>('')
  const [cyaNow, setCyaNow] = useState<string>('')
  const [chNow, setChNow] = useState<string>('')
  const [borateNow, setBorateNow] = useState<string>('')
  const [saltNow, setSaltNow] = useState<string>('')

  const calculateFreeChlorine = () => {
    const gallonsNum = parseFloat(gallons) || 0
    const fcNowNum = parseFloat(fcNow) || 0
    const fcTarget = 5

    if (fcTarget > fcNowNum && gallonsNum > 0) {
      const ppm = fcTarget - fcNowNum
      const chlorine = (ppm * gallonsNum) / (10000 * 12)
      return `Add ${chlorine.toFixed(2)} gallons (12% liquid chlorine)`
    }
    return ''
  }

  const calculateCYA = () => {
    const gallonsNum = parseFloat(gallons) || 0
    const cyaNowNum = parseFloat(cyaNow) || 0
    const cyaTarget = 50

    if (cyaTarget > cyaNowNum && gallonsNum > 0) {
      const ppm = cyaTarget - cyaNowNum
      const cyaLbs = (ppm / 10) * 0.81 * (gallonsNum / 10000)
      return `Add ${cyaLbs.toFixed(2)} lbs CYA`
    }
    return ''
  }

  const calculateCalcium = () => {
    const gallonsNum = parseFloat(gallons) || 0
    const chNowNum = parseFloat(chNow) || 0
    const chTarget = 300

    if (chTarget > chNowNum && gallonsNum > 0) {
      const ppm = chTarget - chNowNum
      const calcium = (ppm / 10) * 1.25 * (gallonsNum / 10000)
      return `Add ${calcium.toFixed(2)} lbs Calcium`
    }
    return ''
  }

  const calculateBorates = () => {
    const gallonsNum = parseFloat(gallons) || 0
    const borateNowNum = parseFloat(borateNow) || 0
    const borateTarget = 50

    if (borateTarget > borateNowNum && gallonsNum > 0) {
      const ppm = borateTarget - borateNowNum
      const borate = (ppm / 10) * 4.75 * (gallonsNum / 10000)
      return `Add ${borate.toFixed(2)} lbs Boric Acid`
    }
    return ''
  }

  const calculateSalt = () => {
    const gallonsNum = parseFloat(gallons) || 0
    const saltNowNum = parseFloat(saltNow) || 0
    const saltTarget = 3600

    if (gallonsNum > 0 && saltTarget > saltNowNum) {
      const ppmNeeded = saltTarget - saltNowNum
      const saltLbs = (ppmNeeded / 3600) * 300 * (gallonsNum / 10000)
      const bags = Math.ceil(saltLbs / 40)
      return `Add ${saltLbs.toFixed(0)} lbs (${bags} bags of 40 lbs)`
    }
    return ''
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">
          💧 Pool Chemical Calculator
        </h1>

        <Card className="mb-4 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Waves className="w-5 h-5 text-blue-600" />
              <Label htmlFor="gallons" className="text-base font-semibold text-slate-700">
                Pool Gallons
              </Label>
            </div>
            <Input
              id="gallons"
              type="number"
              min="1000"
              max="60000"
              placeholder="15000"
              value={gallons}
              onChange={(e) => setGallons(e.target.value)}
              className="mt-2 text-lg"
            />
          </CardContent>
        </Card>

        <Card className="mb-4 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Droplet className="w-5 h-5 text-green-600" />
              <CardTitle className="text-xl text-slate-800">
                Free Chlorine (Target 5 ppm)
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              placeholder="Current Free Chlorine"
              value={fcNow}
              onChange={(e) => setFcNow(e.target.value)}
              className="mb-3"
            />
            {calculateFreeChlorine() && (
              <div className="font-bold text-slate-900 text-lg animate-in fade-in duration-300">
                {calculateFreeChlorine()}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-4 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-purple-600" />
              <CardTitle className="text-xl text-slate-800">
                CYA (Target 50 ppm)
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              placeholder="Current CYA"
              value={cyaNow}
              onChange={(e) => setCyaNow(e.target.value)}
              className="mb-3"
            />
            {calculateCYA() && (
              <div className="font-bold text-slate-900 text-lg animate-in fade-in duration-300">
                {calculateCYA()}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-4 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-orange-600" />
              <CardTitle className="text-xl text-slate-800">
                Calcium (Target 300 ppm)
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              placeholder="Current Calcium"
              value={chNow}
              onChange={(e) => setChNow(e.target.value)}
              className="mb-3"
            />
            {calculateCalcium() && (
              <div className="font-bold text-slate-900 text-lg animate-in fade-in duration-300">
                {calculateCalcium()}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-4 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-yellow-600" />
              <CardTitle className="text-xl text-slate-800">
                Borates (Target 50 ppm)
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              placeholder="Current Borates"
              value={borateNow}
              onChange={(e) => setBorateNow(e.target.value)}
              className="mb-3"
            />
            {calculateBorates() && (
              <div className="font-bold text-slate-900 text-lg animate-in fade-in duration-300">
                {calculateBorates()}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-4 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Plus className="w-5 h-5 text-cyan-600" />
              <CardTitle className="text-xl text-slate-800">
                Salt (Target 3600 ppm)
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              placeholder="Current Salt (ppm)"
              value={saltNow}
              onChange={(e) => setSaltNow(e.target.value)}
              className="mb-3"
            />
            {calculateSalt() && (
              <div className="font-bold text-slate-900 text-lg animate-in fade-in duration-300">
                {calculateSalt()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// END OF FILE