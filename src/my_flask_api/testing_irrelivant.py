import haversine, Unit

lyon = (45.7597, 4.8422) # (lat, lon)
paris = (48.8567, 2.3508)

print(haversine(lyon, paris))


print(haversine(lyon, paris, unit=Unit.MILES))
print(haversine(lyon, paris, unit='mi'))