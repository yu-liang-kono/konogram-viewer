# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'livereload' do
  watch(%r{app/index.html})
  watch(%r{app/views/.+\.html})
  watch(%r{app/styles/.+\.css})
  watch(%r{app/scripts/.+\.js})
end


guard 'shell' do
  # automatically compile livescript
  watch(%r{app/scripts/.+\.ls}) do |f|
    `lsc -c #{f[0]}`
  end

  # automatically compile sass
  watch(%r{app/styles/.+\.sass}) do |f|
    basename = f[0][0..-6]
    target_file = basename + '.css'
    `sass --style=compact #{f[0]}:#{target_file}`
  end
end
