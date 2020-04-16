#
#  projectinfo - ronen.xyz microservice for fetching github project information.
#  Copyright (C) Ronen Lapushner 2019 - 2020.
# 
#  This program is free software: you can redistribute it and/or modify
#  it under the terms of the GNU Affero General Public License as published
#  by the Free Software Foundation, either version 3 of the License, or
#  (at your option) any later version.
# 
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU Affero General Public License for more details.
# 
#  You should have received a copy of the GNU Affero General Public License
#  along with this program.  If not, see <https://www.gnu.org/licenses/>.
#

FROM golang:1.13-alpine

# Copy all required files
WORKDIR /go/src/app
COPY . .

# Install git
RUN apk add --no-cache git

# Build and install the application itself
RUN go install -ldflags "-X main.Version=`cat ./version`" -v . 

EXPOSE 80

CMD ["app"]