/**
 * Copyright 2012-2013 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You
 * may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 */

var AWS = require('../core');

AWS.DynamoDB = AWS.Service.defineService('./services/dynamodb.api', {
  Client: {
    /**
     * @api private
     */
    defaultRetryCount: 10,

    /**
     * @api private
     */
    retryDelays: function retryDelays() {
      var retryCount = this.numRetries();
      var delays = [];
      for (var i = 0; i < retryCount; ++i) {
        if (i === 0) {
          delays.push(0);
        } else {
          delays.push(50 * Math.pow(2, i - 1));
        }
      }
      return delays;
    }
  }
});
